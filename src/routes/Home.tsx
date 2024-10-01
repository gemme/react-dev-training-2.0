import React from 'react';
import { useRouteError } from "react-router-dom";

export const Home = () => {
    const error = useRouteError();
    console.log(error?.statusText)
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the React Learning Kit!</p>
        </div>
    )
}