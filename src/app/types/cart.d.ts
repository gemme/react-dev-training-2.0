export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lines: Lines;
  cost: Cost;
}

export interface Cost {
  totalAmount: SubtotalAmount;
  subtotalAmount: SubtotalAmount;
}

export interface SubtotalAmount {
  amount: string;
  currencyCode: CurrencyCode;
}

export enum CurrencyCode {
  CAD = "CAD",
}

export interface Lines {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  id: string;
  quantity: number;
  cost: Cost;
  merchandise: Merchandise;
}

export interface Merchandise {
  id: string;
  title: string;
  image: Image;
  product: Product;
  price: SubtotalAmount;
}

export interface Image {
  id: string;
  url: string;
}

export interface Product {
  title: string;
  selectedOrFirstAvailableVariant: SelectedOrFirstAvailableVariant;
}

export interface SelectedOrFirstAvailableVariant {
  selectedOptions: SelectedOption[];
}

export interface SelectedOption {
  name: string;
  value: string;
}
