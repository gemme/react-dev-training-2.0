import React from 'react';

import { Link, Outlet } from 'react-router-dom'
import './Root.css';

export const Root = () => {
    return (
        <>
            <div className="topnav">
                <Link className="active" to={'/'}>Home</Link>
                <Link to={'/cart'}>Cart</Link>
            </div>
        </>
    );
}