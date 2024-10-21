import React from 'react';

import { Link, Outlet } from 'react-router-dom'

export const Root = () => {
    return (
        <>
            <div id="sidebar">

                <nav>
                    <ul>
                        <li>
                            <Link to={`converter/`}>Currencies Converter</Link>
                        </li>
                        <li>
                            <Link to={`forms/`}>Forms</Link>
                        </li>
                        <li>
                            <Link to={`custom-hooks/`}>Custom Hooks</Link>
                        </li>
                        <li>
                            <Link to={`use-reducer/`}>useReducer hook</Link>
                        </li>
                        <li>
                            <Link to={`use-ref/`}>useRef hook</Link>
                        </li>
                        <li>
                            <Link to={`use-memo/`}>useMemo hook</Link>
                        </li>
                        <li>
                            <Link to={`use-callback/`}>useCallback hook</Link>
                        </li>
                        <li>
                            <Link to={`use-context/`}>useContext hook</Link>
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