import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./routes/ErrorPage";
import { Forms } from "./routes/Forms";
import { CounterReducer } from "./routes/CounterReducer";
import { FormsWithCustomHooks } from "./routes/FormsWithCustomHooks";
import { FormWithUseRef } from "./routes/FormWithUseRef";
import { Factorial } from "./routes/Factorial";
import { ComponentWithUseCallback } from "./routes/ComponentWithUseCallback";
import { ComponentWithUseContext } from "./routes/ComponentWithUseContext";
import { SearchPerson } from "./routes/SearchPerson";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Root } from "./routes/Root";
import { Home } from "./routes/Home";
import { Converter } from "./routes/Converter";
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
            {
                path: "converter/",
                element: <Converter />,
            },
            {
                path: "forms/",
                element: <Forms />,
            },
            {
                path: "custom-hooks/",
                element: <FormsWithCustomHooks />,
            },
            {
                path: "use-reducer/",
                element: <CounterReducer />,
            },
            {
                path: "use-ref/",
                element: <FormWithUseRef />,
            },
            {
                path: "use-memo/",
                element: <Factorial />,
            },
            {
                path: "use-callback/",
                element: <ComponentWithUseCallback />,
            },
            {
                path: "use-context/",
                element: <ComponentWithUseContext />,
            },
            {
                path: "use-debounce/",
                element: <SearchPerson />,
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