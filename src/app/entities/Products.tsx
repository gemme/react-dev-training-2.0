import React, { useMemo } from "react";
import { Card } from "../Base/components/Card";
import { useGetProducts } from "../queries/getProducts";

export const Products = () => {
  const { data: products, error, isLoading } = useGetProducts({ quantity: 10 });
  return (
    <div className="card-container">
      {products?.map((product) => {
        const variant = product.variants.edges[0];
        const price = variant.node.price;

        return (
          <Card
            key={product.featuredImage.id}
            price={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: price.currencyCode,
            }).format(Number(price.amount))}
            height={200}
            src={product.featuredImage.url}
            description={product.description}
          />
        );
      })}
      {error && error.message}
    </div>
  );
};
