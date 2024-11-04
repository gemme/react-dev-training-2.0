import { useQuery } from "@tanstack/react-query";
import { CartService } from "../services/CartService";
import type { Cart } from "../types/cart";
import { formatQuery } from "../utils/formatQuery";

interface UseGetCart {
  cartId: string;
}

export const useGetCart = ({ cartId }: UseGetCart) => {
  const cartService = new CartService();
  let query = `
        {
  cart(id: $cartId) {
      id
      createdAt
      updatedAt
      lines(first: 22) {
        edges {
          node {
            id
            quantity
            cost{
              subtotalAmount{
                amount
                currencyCode
              }
              totalAmount{
                amount
                currencyCode
              }
            }
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  id
                  url
                }
                product{
                  title
                  selectedOrFirstAvailableVariant{
                    selectedOptions{
                      name
                      value
                    }
                  }
                }
                price{
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
}

            `;

  query = formatQuery<string>(query, [{ key: "$cartId", value: cartId }]);

  return useQuery<Cart, Error>({
    queryKey: ["cartDetails", query],
    queryFn: async () => {
      const json = await cartService.getCart({ params: { query } });
      return json.data.cart;
    },
    cacheTime: 0,
  });
};
