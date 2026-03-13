#!/usr/bin/env node

const FILE_MODEL_UID = 'plugin::upload.file';
const DEFAULT_BATCH_SIZE = 100;

function printUsage() {
  console.log(`
Usage:
  npm run cleanup:media:s3
  npm run cleanup:media:s3:apply
  node scripts/cleanup-missing-s3-assets.js [--apply] [--batch-size=100]

Options:
  --apply           Delete broken media records and strip missing formats from DB
  --batch-size=N    Number of files to scan per batch (default: 100)
  --help            Show this help
`);
}

function parseArgs(argv) {
  const args = {
    apply: false,
    batchSize: DEFAULT_BATCH_SIZE,
    help: false,
  };

  for (const arg of argv) {
    if (arg === '--apply') {
      args.apply = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      args.help = true;
      continue;
    }

    if (arg.startsWith('--batch-size=')) {
      const value = Number.parseInt(arg.split('=')[1], 10);

      if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`Invalid --batch-size value: ${arg}`);
      }

      args.batchSize = value;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

async function objectExists(provider, file) {
  if (typeof provider.objectExists === 'function') {
    return provider.objectExists(file);
  }

  if (typeof provider.getObjectMetadata === 'function') {
    try {
      await provider.getObjectMetadata(file);
      return true;
    } catch (error) {
      if (error?.name === 'NotFound' || error?.$metadata?.httpStatusCode === 404) {
        return false;
      }

      throw error;
    }
  }

  throw new Error('The active upload provider does not support object existence checks.');
}

async function main() {
  const { createStrapi, compileStrapi } = await import('@strapi/strapi');
  const args = parseArgs(process.argv.slice(2));

  if (args.help) {
    printUsage();
    return;
  }

  process.env.STRAPI_DISABLE_UPDATE_NOTIFICATION = 'true';
  process.env.STRAPI_TELEMETRY_DISABLED = 'true';

  const appDir = process.cwd();
  const { distDir } = await compileStrapi({ appDir });
  const strapi = createStrapi({ appDir, distDir });

  const stats = {
    scanned: 0,
    missingFiles: 0,
    updatedFormats: 0,
    removedRecords: 0,
  };

  try {
    await strapi.load();

    const uploadConfig = strapi.config.get('plugin::upload');
    const providerName = uploadConfig?.provider;
    const provider = strapi.plugin('upload').provider;

    if (providerName !== 'aws-s3') {
      throw new Error(
        `This cleanup is intended for the aws-s3 provider. Active provider: ${providerName ?? 'unknown'}`,
      );
    }

    const fileQuery = strapi.db.query(FILE_MODEL_UID);
    const uploadService = strapi.plugin('upload').service('upload');
    const total = await fileQuery.count({
      where: {
        provider: providerName,
      },
    });

    console.log(
      `[cleanup:media:s3] ${args.apply ? 'apply' : 'dry-run'} mode, provider=${providerName}, files=${total}, batchSize=${args.batchSize}`,
    );

    let lastId = 0;

    let hasMoreFiles = true;

    while (hasMoreFiles) {
      const files = await fileQuery.findMany({
        where: {
          provider: providerName,
          id: {
            $gt: lastId,
          },
        },
        orderBy: {
          id: 'asc',
        },
        limit: args.batchSize,
      });

      if (files.length === 0) {
        hasMoreFiles = false;
        continue;
      }

      for (const file of files) {
        lastId = file.id;
        stats.scanned += 1;

        const originalExists = await objectExists(provider, file);

        if (!originalExists) {
          stats.missingFiles += 1;

          console.log(`[missing] #${file.id} ${file.name} (${file.url})`);

          if (args.apply) {
            await uploadService.remove(file);
            stats.removedRecords += 1;
            console.log(`  removed DB record`);
          }

          continue;
        }

        const formats = file.formats && typeof file.formats === 'object' ? file.formats : null;

        if (!formats) {
          continue;
        }

        const nextFormats = {};
        const missingFormatKeys = [];

        for (const [formatKey, formatFile] of Object.entries(formats)) {
          if (!formatFile || typeof formatFile !== 'object') {
            continue;
          }

          const formatExists = await objectExists(provider, formatFile);

          if (formatExists) {
            nextFormats[formatKey] = formatFile;
          } else {
            missingFormatKeys.push(formatKey);
          }
        }

        if (missingFormatKeys.length === 0) {
          continue;
        }

        stats.updatedFormats += 1;

        console.log(`[formats] #${file.id} ${file.name} missing formats: ${missingFormatKeys.join(', ')}`);

        if (args.apply) {
          await fileQuery.update({
            where: {
              id: file.id,
            },
            data: {
              formats: nextFormats,
            },
          });

          console.log(`  updated formats in DB`);
        }
      }
    }

    console.log('');
    console.log('[cleanup:media:s3] done');
    console.log(`  scanned: ${stats.scanned}`);
    console.log(`  missing original files: ${stats.missingFiles}`);
    console.log(`  files with missing formats: ${stats.updatedFormats}`);
    console.log(`  removed DB records: ${stats.removedRecords}`);

    if (!args.apply) {
      console.log('  no DB changes were made (dry-run)');
    }
  } finally {
    await strapi.destroy();
  }
}

main().catch((error) => {
  console.error(`[cleanup:media:s3] failed: ${error.message}`);

  if (error.stack) {
    console.error(error.stack);
  }

  process.exit(1);
});
