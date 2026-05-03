import type { TRequestForm } from '@/contracts';
import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async sendForm(params: TRequestForm) {
    const to = process.env.SMTP_USERNAME;

    if (!to) {
      throw new Error('Email recipient is not configured');
    }

    await strapi
      .plugin('email')
      .service('email')
      .send({
        to,
        subject: buildSubject(params),
        text: buildPlainText(params),
        html: buildHtml(params),
      });
  },
});

function buildSubject(params: TRequestForm): string {
  return params.pageUrl ? `Новая заявка с ${params.pageUrl}` : 'Новая заявка с сайта';
}

function buildPlainText(params: TRequestForm): string {
  return [
    buildSubject(params),
    hasName(params.name) ? `Имя: ${params.name}` : null,
    `Телефон: ${params.phone}`,
    params.pageUrl ? `Источник: ${params.pageUrl}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

function buildHtml(params: TRequestForm): string {
  const subject = escapeHtml(buildSubject(params));
  const safePhone = escapeHtml(params.phone);
  const callHref = buildTelHref(params.phone);
  const details = [
    hasName(params.name) ? buildDetailRow('Имя', escapeHtml(params.name)) : '',
    buildDetailRow('Телефон', safePhone),
    params.pageUrl ? buildDetailRow('Источник', escapeHtml(params.pageUrl)) : '',
  ]
    .filter(Boolean)
    .join('');

  return `
    <div style="margin:0; padding:32px 16px; background-color:#f3f4f6; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:#111827;">
      <div style="max-width:560px; margin:0 auto; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:20px; overflow:hidden; box-shadow:0 10px 30px rgba(17,24,39,0.08);">
        <div style="padding:28px 32px; background:linear-gradient(135deg, #111827 0%, #1f2937 100%); color:#ffffff;">
          <div style="display:inline-block; padding:6px 12px; border-radius:999px; background-color:rgba(255,255,255,0.12); font-size:12px; line-height:16px; letter-spacing:0.04em; text-transform:uppercase;">
            Alfa Realting
          </div>
          <h1 style="margin:16px 0 8px; font-size:28px; line-height:34px; font-weight:700;">${subject}</h1>
        </div>

        <div style="padding:28px 32px 32px;">
          <div style="margin-bottom:24px; padding:20px; border:1px solid #e5e7eb; border-radius:16px; background-color:#f9fafb;">
            ${details}
          </div>

          <a
            href="${callHref}"
            style="display:inline-block; padding:14px 20px; border-radius:12px; background-color:#111827; color:#ffffff; font-size:15px; line-height:20px; font-weight:600; text-decoration:none;"
          >
            Позвонить: ${safePhone}
          </a>
        </div>
      </div>
    </div>
  `.trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildDetailRow(label: string, value: string): string {
  return `
    <div style="padding:14px 0; border-bottom:1px solid #e5e7eb;">
      <div style="margin-bottom:4px; font-size:12px; line-height:16px; font-weight:600; letter-spacing:0.04em; text-transform:uppercase; color:#6b7280;">
        ${label}
      </div>
      <div style="font-size:16px; line-height:24px; font-weight:600; color:#111827;">
        ${value}
      </div>
    </div>
  `.trim();
}

function buildTelHref(phone: string): string {
  const normalizedPhone = phone.replace(/[^\d+]/g, '');

  return `tel:${normalizedPhone}`;
}

function hasName(name: null | string | undefined): name is string {
  return Boolean(name?.trim());
}
