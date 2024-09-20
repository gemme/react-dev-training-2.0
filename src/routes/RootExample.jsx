import "../index.css";
import { Outlet, Link } from "react-router-dom";

export const RootExample = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/page-1/2">Page 1</Link>
          </li>
          <li>
            <Link to="/page-2/">Page 2</Link>
          </li>
        </ul>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};
