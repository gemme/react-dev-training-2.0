import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartService } from "../services/CartService";
import { formatQuery } from "../utils/formatQuery";
import type { Cart } from "../types/cart";

interface UseCreateCart {
  cartId: string;
  merchandiseId: string;
  quantity: number;
}

export const useUpdateCart = () => {
  const cartService = new CartService();
  const queryClient = useQueryClient();

  let query = `
       mutation {
  cartLinesAdd(
    cartId: $cartId
    lines: [
      {
        quantity: $quantity
        merchandiseId: $merchandiseId
      }
    ]
  ) {
    cart {
      id
      createdAt
      updatedAt
      lines(first: 10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  id
                  url
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
}

            `;

  return useMutation<Cart, Error, UseCreateCart>({
    mutationFn: async ({ merchandiseId, quantity = 1, cartId }) => {
      query = formatQuery<string | number>(query, [
        { key: "$cartId", value: cartId },
        { key: "$merchandiseId", value: merchandiseId },
        { key: "$quantity", value: quantity },
      ]);
      const json = await cartService.updateCart({ body: { query } });
      return json.data.cartCreate;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartDetails"] });
    },
  });
};
