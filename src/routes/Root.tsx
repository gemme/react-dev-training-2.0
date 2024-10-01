import React from 'react';

import { Link, Outlet } from 'react-router-dom'

export const Root = () => {
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>

                        <li>
                            <Link to={`/inbox-messages`}>Inbox Messages</Link>
                        </li>
                        <li>
                            <Link to={`star-wars/`}>StarWars</Link>
                        </li>

                        <li>
                            <Link to={`digital-clock/`}>Digital Clock</Link>
                        </li>
                        <li>
                            <Link to={`calculator/`}>Calculator</Link>
                        </li>
                        <li>
                            <Link to={`flicker/`}>Flicker</Link>
                        </li>
                        <li>
                            <Link to={`converter/`}>Currencies Converter</Link>
                        </li>
                        <li>
                            <Link to={`controlled-inputs/`}>Controlled Inputs</Link>
                        </li>
                        <li>
                            <Link to={`redux/`}>Redux</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}