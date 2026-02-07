import type { Schema, Struct } from '@strapi/strapi';

export interface SharedImages extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'image';
  };
  attributes: {
    image: Schema.Attribute.Media<'files' | 'images'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSliderItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_slider_items';
  info: {
    displayName: 'SliderItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Component<'shared.images', false> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.images': SharedImages;
      'shared.seo': SharedSeo;
      'shared.slider-item': SharedSliderItem;
    }
  }
}
