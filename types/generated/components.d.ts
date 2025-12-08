import type { Schema, Struct } from '@strapi/strapi';

export interface ElementosLink extends Struct.ComponentSchema {
  collectionName: 'components_elementos_links';
  info: {
    displayName: 'link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ElementosLinkitem extends Struct.ComponentSchema {
  collectionName: 'components_elementos_linkitems';
  info: {
    displayName: 'linkitem';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface LayoutSectionFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_section_footers';
  info: {
    displayName: 'SectionFooter';
  };
  attributes: {
    links: Schema.Attribute.Component<'elementos.linkitem', true>;
    titulo: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elementos.link': ElementosLink;
      'elementos.linkitem': ElementosLinkitem;
      'layout.section-footer': LayoutSectionFooter;
    }
  }
}
