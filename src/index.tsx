import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense, lazy } from 'react';
import {
    createRoutesFromElements, createBrowserRouter, RouterProvider, HashRouter, Navigate, Route, Routes, useNavigate, useLocation
} from 'react-router-dom';
import ErrorPage from "./routes/ErrorPage";
import { Calculator } from "./routes/Calculator";
import { DigitalClock } from "./routes/DigitalClock";
import { InboxMessages } from "./routes/InboxMessages";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Root from "./routes/Root";
import { StarWars } from "./routes/StarWars";
import { Flicker } from "./routes/Flicker";
import { Home } from "./routes/Home";
import { Converter } from "./routes/Converter";
import PropDrilling from "./routes/PropDrilling";
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
                path: "star-wars/",
                element: <StarWars />,
            },
            {
                path: "inbox/",
                element: <InboxMessages />,
            },
            {
                path: "digital-clock/",
                element: <DigitalClock />,
            },
            {
                path: "calculator/",
                element: <Calculator />,
            },
            {
                path: "flicker/",
                element: <Flicker />,
            },
            {
                path: "converter/",
                element: <Converter />,
            },

        ],
    },
]);



const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

root.render(
    <RouterProvider router={router} />,
)