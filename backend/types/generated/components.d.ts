import type { Schema, Struct } from '@strapi/strapi';

export interface AboutPageComponentsAboutPageComponents extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_about_page_components';
  info: {
    displayName: 'DescriptionSection';
  };
  attributes: {
    advantage: Schema.Attribute.Component<'shared.metric-item', false>;
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutPageComponentsFactsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_facts_sections';
  info: {
    displayName: 'FactsSection';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutPageComponentsPathSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_path_sections';
  info: {
    displayName: 'PathSection';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    paths: Schema.Attribute.Component<'shared.feature-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutPageComponentsTeamItem extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_team_items';
  info: {
    displayName: 'TeamItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    email: Schema.Attribute.Email;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String;
    photo: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
    position: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutPageComponentsTeamSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_team_sections';
  info: {
    displayName: 'TeamSection';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    team: Schema.Attribute.Component<'about-page-components.team-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutPageComponentsValuesSection extends Struct.ComponentSchema {
  collectionName: 'components_about_page_components_values_sections';
  info: {
    displayName: 'ValuesSection';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    image: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBadge extends Struct.ComponentSchema {
  collectionName: 'components_shared_badges';
  info: {
    displayName: 'Badge';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface SharedGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_items';
  info: {
    displayName: 'GalleryItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    group: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files'> & Schema.Attribute.Required;
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

export interface SharedRequestBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_request_banners';
  info: {
    displayName: 'RequestBanner';
  };
  attributes: {
    advantages: Schema.Attribute.Component<'shared.badge', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface SharedShowcaseBanner extends Struct.ComponentSchema {
  collectionName: 'components_shared_showcase_banners';
  info: {
    displayName: 'ShowcaseBanner';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    properties: Schema.Attribute.Relation<'oneToMany', 'api::property.property'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSpecItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_spec_items';
  info: {
    displayName: 'SpecItem';
  };
  attributes: {
    key: Schema.Attribute.Enumeration<
      [
        'floor',
        'area',
        'ceiling_height',
        'layout',
        'bathroom',
        'facility_readiness',
        'entrance',
        'parking',
        'energy',
        'internet',
        'ventilation',
        'alarm_system',
      ]
    > &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-page-components.about-page-components': AboutPageComponentsAboutPageComponents;
      'about-page-components.facts-section': AboutPageComponentsFactsSection;
      'about-page-components.path-section': AboutPageComponentsPathSection;
      'about-page-components.team-item': AboutPageComponentsTeamItem;
      'about-page-components.team-section': AboutPageComponentsTeamSection;
      'about-page-components.values-section': AboutPageComponentsValuesSection;
      'shared.badge': SharedBadge;
      'shared.feature-banner': SharedFeatureBanner;
      'shared.feature-item': SharedFeatureItem;
      'shared.gallery-item': SharedGalleryItem;
      'shared.hero-banner': SharedHeroBanner;
      'shared.images': SharedImages;
      'shared.metric-item': SharedMetricItem;
      'shared.request-banner': SharedRequestBanner;
      'shared.seo': SharedSeo;
      'shared.showcase-banner': SharedShowcaseBanner;
      'shared.spec-item': SharedSpecItem;
    }
  }
}
