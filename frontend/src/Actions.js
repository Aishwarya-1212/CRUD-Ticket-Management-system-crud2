import {NavLink, Outlet} from "react-router-dom";
export default function Actions()
{
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <NavLink to='submit'>SUBMIT TICKET</NavLink>
                    </li>
                    <li>
                        <NavLink to='getticket'>GET TICKET</NavLink>
                    </li>
                    <li>
                        <NavLink to='updateticket'>UPDATE TICKET</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </>
    );
}