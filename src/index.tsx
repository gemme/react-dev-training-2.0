import React, { ReactElement, Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./routes/ErrorPage";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Root } from "./routes/Root";
//import { Home } from "./routes/Home";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "./index.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { ProductDetails } from './routes/ProductDetails';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { createRoutesFromElements, Route, Navigate, HashRouter, Routes, useRouteError, BrowserRouter } from 'react-router-dom';

/* const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/product-details/:handle",
                element: <ProductDetails />,
            },
        ],
    },

]);
 */
function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return <div>{error.message}</div>;
}


//HOC
//high order components
const withLazySuspense = function (loader: any) {
    const LazyComponent = lazy(loader);
    return function (props: any) {
        return (
            <Suspense fallback={<>Loading...</>}>
                <LazyComponent {...props} />
            </Suspense>
        )
    }
}

const Home = withLazySuspense(() => import('./routes/Home'));
const ProductDetails = withLazySuspense(() => import('./routes/ProductDetails'));
const CartDetails = lazy(() => import('./routes/CartDetails'));

const App = () => {

    return (
        <div>
            <Root />
            <div id="detail">
                <Suspense fallback={<>loading...</>}>
                    <Routes>
                        <Route errorElement={<ErrorBoundary />} path="/" element={< Navigate to={'/home'} />} />
                        < Route errorElement={<ErrorBoundary />} path="/home" element={<Home />} />
                        < Route errorElement={<ErrorBoundary />} path="/product-details/:handle" element={<ProductDetails />} />
                        < Route errorElement={<ErrorBoundary />} path="/cart" element={<CartDetails />} />
                    </Routes>
                </Suspense>
            </div>
        </div>

    )
}


const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <BrowserRouter >
            <QueryClientProvider client={queryClient}>
                <App />
                {/* <RouterProvider router={router} /> */}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
    ,
)

// render 2 veces
// build