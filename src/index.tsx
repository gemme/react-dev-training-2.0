import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./routes/ErrorPage";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Root } from "./routes/Root";
import { Home } from "./routes/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
    ,
)

// render 2 veces
// build