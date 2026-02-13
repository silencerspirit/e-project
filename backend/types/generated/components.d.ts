import type { Schema, Struct } from '@strapi/strapi';

export interface SharedHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_banners';
  info: {
    displayName: 'HeroBanner';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Component<'shared.images', false> & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    metrics: Schema.Attribute.Component<'shared.metric-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedImages extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SharedMetricItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_metric_items';
  info: {
    displayName: 'MetricItem';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.hero-banner': SharedHeroBanner;
      'shared.images': SharedImages;
      'shared.metric-item': SharedMetricItem;
      'shared.seo': SharedSeo;
    }
  }
}
