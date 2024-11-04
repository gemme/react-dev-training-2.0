import { useMutation } from "@tanstack/react-query";
import { CartService } from "../services/CartService";
import { formatQuery } from "../utils/formatQuery";
import type { Cart } from "../types/cart";

interface UseCreateCart {
  merchandiseId: string;
  quantity: number;
}

export const useCreateCart = () => {
  const cartService = new CartService();
  let query = `
        mutation CartCreate {
  cartCreate(
    input: {
      lines: [
        {
          quantity: $quantity
          merchandiseId: $merchandiseId
        }
      ]
    }
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
    mutationFn: async ({ merchandiseId, quantity }) => {
      query = formatQuery<string>(query, [
        { key: "$merchandiseId", value: merchandiseId },
        { key: "$quantity", value: quantity },
      ]);
      const json = await cartService.createCart({ body: { query } });
      return json.data.cartCreate.cart;
    },
  });
};
