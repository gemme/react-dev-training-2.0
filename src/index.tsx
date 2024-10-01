import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./routes/ErrorPage";
import { Calculator } from "./routes/Calculator";
import { DigitalClock } from "./routes/DigitalClock";
import { InboxMessages } from "./routes/InboxMessages";
import { ControlledInputs } from "./routes/ControlledInputs";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Root } from "./routes/Root";
import { StarWars } from "./routes/StarWars";
import { Flicker } from "./routes/Flicker";
import { Home } from "./routes/Home";
import { Converter } from "./routes/Converter";
import { Redux } from "./routes/Redux";
import store from './app/store'
import { Provider } from 'react-redux'
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
                path: "star-wars/",
                element: <StarWars />,
            },
            {
                path: "inbox-messages/",
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
            {
                path: "controlled-inputs/",
                element: <ControlledInputs />,
            },
            {
                path: "redux/",
                element: <Redux />,
            },
        ],
    },
]);

const domNode = document.getElementById('root')!;
const root = ReactDOM.createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
    ,
)