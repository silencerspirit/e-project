import type { TRequestForm } from '@/contracts';
import type { Core } from '@strapi/strapi';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async sendForm(params: TRequestForm & { referer?: string }) {
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

function buildSubject(params: TRequestForm & { referer?: string }): string {
  return params.referer ? `Новая заявка с ${params.referer}` : 'Новая заявка с сайта';
}

function buildPlainText(params: TRequestForm & { referer?: string }): string {
  return [buildSubject(params), `Имя: ${params.name ?? '-'}`, `Телефон: ${params.phone}`].filter(Boolean).join('\n');
}

function buildHtml(params: TRequestForm & { referer?: string }): string {
  return [
    `<h2>${escapeHtml(buildSubject(params))}</h2>`,
    `<p><strong>Имя:</strong> ${escapeHtml(params.name ?? '-')}</p>`,
    `<p><strong>Телефон:</strong> ${escapeHtml(params.phone)}</p>`,
  ]
    .filter(Boolean)
    .join('');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
