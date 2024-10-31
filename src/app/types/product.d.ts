// estos types se tienen generar apartir servicios

export interface Products {
  id: string;
  title: string;
  description: string;
  featuredImage: FeaturedImage;
  variants: Variants;
}

export interface FeaturedImage {
  id: string;
  url: string;
}

export interface Variants {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  price: Price;
}

export interface Price {
  amount: string;
  currencyCode: string;
}
