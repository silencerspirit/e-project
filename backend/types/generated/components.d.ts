import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFeatureBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_banners';
  info: {
    displayName: 'FeatureBanner';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    features: Schema.Attribute.Component<'shared.feature-item', true> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'FeatureItem';
  };
  attributes: {
    additional: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

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
      'shared.feature-banner': SharedFeatureBanner;
      'shared.feature-item': SharedFeatureItem;
      'shared.hero-banner': SharedHeroBanner;
      'shared.images': SharedImages;
      'shared.metric-item': SharedMetricItem;
      'shared.seo': SharedSeo;
    }
  }
}
