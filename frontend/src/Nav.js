import {NavLink} from "react-router-dom";
export default function Nav()
{
    return (
        <>
        <nav>
            <ul>
                <li>
                    <NavLink to='/'>HOME</NavLink>
                </li>
                <li>
                    <button><NavLink to='/actions'>ACTIONS</NavLink></button>
                </li>
            </ul>
        </nav>
        </>
    );
}