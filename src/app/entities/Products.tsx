import React, { useMemo } from "react";
import { Card } from "../Base/components/Card";
import { useGetProducts } from "../queries/getProducts";
import type { Products as ProductsType } from "../types/product";
import { QueryLoader } from "../loaders/QueryLoader";
import { Link } from "react-router-dom";

interface ProductsProps {
  products: ProductsType[];
  error: Error;
  loading: boolean;
}

export const Products = ({ products, error, loading }: ProductsProps) => {
  //const { data: products, error, isLoading } = useGetProducts({ quantity: 10 });
  // useQuery
  return (
    <div className="card-container">
      {products?.map((product) => {
        const variant = product.variants.edges[0];
        const price = variant.node.price;

        const variantParams = variant.node.selectedOptions.map(option => {
          return {
            name: option.name,
            value: option.value
          }
        })
        const searchParams = new URLSearchParams();
        variantParams.forEach(({ name, value }) => {
          searchParams.append(name, value);
        })

        return (
          <Link to={'/product-details/' + product.handle + '/?' + searchParams.toString()}>
            <Card
              key={product.featuredImage.id}
              price={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: price.currencyCode,
              }).format(Number(price.amount))}
              height={200}
              src={product.featuredImage.url}
              title={product.title}
            />
          </Link>

        );
      })}
      {error && error.message}
    </div>
  );
};

export const ProductsContainer = () => {

  return (
    <QueryLoader
      query={useGetProducts}
      params={{ quantity: "20" }}
      fallback={<div>My Own Loading component...</div>}>
      {
        (data, error, loading) => {
          return <Products products={data} error={error} loading={loading} />
        }
      }
    </QueryLoader>
  )
}
