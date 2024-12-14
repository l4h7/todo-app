
import Link from "next/link";
import LogoutForm from "./LogoutForm";
import { getUser } from "../lib/dal";

export default  async function Navbar() {
const session = await getUser();

    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost font-black text-lg sm:text-xl ">Shishapoint Bad Wildungen</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/products">Produkte</Link></li>
                    {!session.isLoggedIn && <li><Link href="login">Login</Link></li>}
                   {session.isLoggedIn && <LogoutForm username={session.user?.user_name}></LogoutForm>} 
                </ul>
            </div>
        </div>
    )
}