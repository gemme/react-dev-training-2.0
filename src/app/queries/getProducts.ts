import { useQuery } from "@tanstack/react-query";
import { ProductService } from "../services/ProductService";
import { Products } from "../types/product";

interface GetProducts {
  quantity: number;
}

export const useGetProducts = ({ quantity }: GetProducts) => {
  const productService = new ProductService();
  const query = `
        {
            products(first: ${quantity}) {
              edges {
                node {
                  id
                  title
                  description
                  featuredImage {
                    id
                    url
                  }
                  variants(first: 3) {
                    edges {
                      node {
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
