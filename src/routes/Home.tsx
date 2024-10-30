import React, { useEffect, useState } from 'react';
import { useRouteError } from "react-router-dom";
import { Card } from '../app/Base/components/Card';
import './Home.css';

export const Home = () => {
    const error = useRouteError();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const query =
            `
        {
            products(first: ${10}) {
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
            `
        fetch('https://mock.shop/api?query=' + query)
            .then(response => response.json())
            .then(json => {
                const formattedProducts = json.data.products.edges.map((edge: any) => {
                    return edge.node
                })
                setProducts(formattedProducts);
            })// catch
        //loading spinner - skeletons
    }, [])
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the React Advanced Learning Kit!</p>
            <div className='card-container'>
                {products.map((product: any) => {
                    return <Card height={200} src={product.featuredImage.url} description={product.description} />
                })}
            </div>

        </div>
    )
}