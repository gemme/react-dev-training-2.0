import React from 'react';

import { Link, Outlet } from 'react-router-dom'

/* export const Root = () => {
    return (
        <>
            <div id="sidebar">
                <h1>Welcome</h1>
                <nav>
                    <ul>
                        <li>

                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
} */

export const Root = () => {
    return (
        <>
            <div id="sidebar">

                <nav>
                    <ul>
                        <li>
                            <Link to={'/'}>home</Link>
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