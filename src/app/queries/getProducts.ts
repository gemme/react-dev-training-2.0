import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/ProductService";
import type { Products, Product, SelectedOption } from "../types/product";
import { formatQuery } from "../utils/formatQuery";

interface UseGetProducts {
  quantity: number;
}

export const useGetProducts = ({ quantity }: UseGetProducts) => {
  const productService = new ProductService();
  let query = `
        {
            products(first: $quantity) {
              edges {
                node {
                  id
                  handle
                  title
                  description
                  featuredImage {
                    id
                    url
                  }
                  variants(first: 3) {
                    edges {
                      node {
                      selectedOptions{
                        name
                        value
                      }
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
            `;

  query = formatQuery<SelectedOption[] | number>(query, [
    { key: "$quantity", value: Number(quantity) },
  ]);

  return useQuery<Products[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const json = await productService.getProducts({ params: { query } });
      const formattedProducts = json.data.products.edges.map((edge: any) => {
        return edge.node;
      });
      return formattedProducts;
    },
  });
};

interface UseGetProductByHandle {
  handle: string;
  selectedOptions?: SelectedOption[];
}
export const useGetProductByHandle = ({
  handle,
  selectedOptions,
}: UseGetProductByHandle) => {
  const productService = new ProductService();
  let query = `
        {
  product(handle: $handle) {
    id
    title
    description
    featuredImage {
      id
      url
    }
    options{
      name
      optionValues{
        name
      }
    }
    adjacentVariants{
      selectedOptions{
        name
        value
      }
    }
      variantBySelectedOptions(selectedOptions: $selectedOptions){
          id
          price{
            amount
            currencyCode
          }
          image{
            url
          }
      }
    variants(first: 3){
      nodes{
        id
        price{
          amount
          currencyCode
        }
        image{
          url
          height
          width
        }
        selectedOptions{
          name
          value
        }
      }
    }
  }
}

            `;

  query = formatQuery<SelectedOption[] | string>(query, [
    { key: "$handle", value: handle },
    { key: "$selectedOptions", value: selectedOptions ?? [] },
  ]);

  return useQuery<Product, Error>({
    queryKey: ["productByHandle", query],
    queryFn: async () => {
      const json = await productService.getProductByHandle({
        params: { query },
      });
      return json.data.product;
    },
  });
};

interface GetSelectedVariantProduct {
  handle: string;
  selectedOptions: SelectedOption[];
}
export const useGetSelectedVariantProduct = ({
  handle,
  selectedOptions,
}: GetSelectedVariantProduct) => {
  const productService = new ProductService();
  let query = `
  {
    product(handle: $handle) {
      variantBySelectedOptions(selectedOptions: $selectedOptions){
          id
          price{
            amount
            currencyCode
          }
          image{
            url
          }
      }
    }
  }`;

  query = formatQuery<SelectedOption[] | string>(query, [
    { key: "$handle", value: handle },
    { key: "$selectedOptions", value: selectedOptions },
  ]);

  return useQuery<Product, Error>({
    queryKey: ["productSelectedVariantProduct", query],
    queryFn: async () => {
      const json = await productService.getProductByHandle({
        params: { query },
      });
      return json.data.product;
    },
  });
};
