// estos types se tienen generar apartir servicios

export interface Products {
  id: string;
  title: string;
  handle: string;
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

// Product type
export interface Product {
  id: string;
  title: string;
  description: string;
  featuredImage: FeaturedImage;
  options: Option[];
  adjacentVariants: AdjacentVariant[];
  variantBySelectedOptions: VariantBySelectedOptions;
  variants: Variants;
}

export interface AdjacentVariant {
  selectedOptions: SelectedOption[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface FeaturedImage {
  id: string;
  url: string;
}

export interface Option {
  name: string;
  optionValues: OptionValue[];
}

export interface OptionValue {
  name: string;
}

export interface VariantBySelectedOptions {
  id: string;
  price: Price;
  image: VariantBySelectedOptionsImage;
}

export interface VariantBySelectedOptionsImage {
  url: string;
}

export interface Price {
  amount: string;
  currencyCode: string;
}

export interface Variants {
  nodes: Node[];
}

export interface Node {
  id: string;
  price: Price;
  image: NodeImage;
  selectedOptions: SelectedOption[];
}

export interface NodeImage {
  url: string;
  height: number;
  width: number;
}
