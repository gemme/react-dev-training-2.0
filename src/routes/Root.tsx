import React from 'react';
import { useCounter } from '../providers/CounterProvider';
import { useUserName } from '../providers/UserProvider';

import { Link, Outlet } from 'react-router-dom'

export const Root = () => {
    const { count } = useCounter();
    const { userName, setUserName } = useUserName();
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
                        <li>
                            <Link to={`use-debounce`}>useDebounce hook</Link>
                        </li>
                        <li>
                            <Link to={`upload-file`}>upload file</Link>
                        </li>
                        <li>
                            <Link to={`users`}>Users</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                {userName && <h1>Bienvenido:  {userName}</h1>}
                <h1>Global Count {count}</h1>

                <Outlet />
            </div>
        </>
    );
}