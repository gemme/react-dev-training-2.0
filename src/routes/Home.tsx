import React, { useMemo } from 'react';
import './Home.css';
import { Products } from '../app/entities/Products'

export const Home = () => {

    //const { data: products, error, isLoading, } = useGetProducts({ quantity: 10 })

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the React Advanced Learning Kit!</p>
            <Products />
        </div>
    )
}