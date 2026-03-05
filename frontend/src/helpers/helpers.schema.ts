import type { TPropertyFullItem } from '@contracts';

export function toAbsoluteUrl(value: string, base: string | URL): string {
  if (!value) {
    return '';
  }

  try {
    return new URL(value).toString();
  } catch {
    return new URL(value, base).toString();
  }
}

export function getPublicSiteUrl(fallback?: string | URL): string {
  const siteUrl = import.meta.env.PUBLIC_SITE_URL?.trim();

  if (siteUrl) {
    return siteUrl.replace(/\/$/, '');
  }

  if (!fallback) {
    return '';
  }

  return toAbsoluteUrl('/', fallback).replace(/\/$/, '');
}

export function createOrganizationSchema(
  base: string | URL,
  {
    name = 'Alfa realting',
    logoPath = '/images/logo.png',
  }: {
    name?: string;
    logoPath?: string;
  } = {},
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: toAbsoluteUrl('/', base),
    logo: toAbsoluteUrl(logoPath, base),
  };
}

export function createWebSiteSchema(
  base: string | URL,
  {
    name = 'Alfa realting',
    inLanguage = 'ru-RU',
  }: {
    name?: string;
    inLanguage?: string;
  } = {},
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: toAbsoluteUrl('/', base),
    inLanguage,
  };
}

export function createBreadcrumbListSchema(
  base: string | URL,
  items: {
    position: number;
    name: string;
    item: string;
  }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: toAbsoluteUrl(item.item, base),
    })),
  };
}

export function createRealEstateListingSchema(
  base: string | URL,
  {
    property,
    pageUrl,
    metaDescription,
    addressCountry = 'RU',
    priceCurrency = 'RUB',
  }: {
    property: TPropertyFullItem;
    pageUrl: string;
    metaDescription?: string;
    addressCountry?: string;
    priceCurrency?: string;
  },
) {
  const imageUrls = [property.previewImage?.formats?.large, ...property.images.map((image) => image.formats.large)]
    .filter((imageUrl): imageUrl is string => Boolean(imageUrl))
    .map((imageUrl) => toAbsoluteUrl(imageUrl, base));

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    description: property.shortDescription || property.description || metaDescription || property.title,
    url: pageUrl,
    image: imageUrls,
    mainEntityOfPage: pageUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address,
      addressLocality: property.city?.name ?? undefined,
      addressCountry,
    },
    offers: {
      '@type': 'Offer',
      price: property.priceFrom,
      priceCurrency,
      availability: 'https://schema.org/InStock',
    },
  };
}
