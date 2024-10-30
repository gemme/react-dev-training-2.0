import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./routes/ErrorPage";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Root } from "./routes/Root";
import { Home } from "./routes/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },

]);


const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
    ,
)

// render 2 veces
// build