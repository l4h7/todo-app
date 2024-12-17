"use server"
import Link from "next/link";
import LogoutForm from "./LogoutForm";
import CartSymbol from "../Cart/CartSymbol";
import { getCart } from "../../actions/cartController";
import { getUser } from "../../actions/userController";
import NavbarLinks from "./NavbarLinks";
import AdminLinks from "./AdminLinks";

export default async function Navbar() {
    const session = await getUser()
    return (
        <div className="navbar bg-base-100">
        <NavbarLinks></NavbarLinks>
            <div className="navbar-end">
                <CartSymbol></CartSymbol>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        {!session.isLoggedIn && <li><Link href="login">Login</Link></li>}
                        {session.isLoggedIn && <LogoutForm username={session.user?.user_name} role={session.user?.user_role}>{session.user?.user_role === "admin" && <AdminLinks></AdminLinks>}</LogoutForm>}
                    </ul>
                </div>
            </div> 
        </div>
    )
}