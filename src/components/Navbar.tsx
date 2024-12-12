
import Link from "next/link";
import LogoutForm from "./LogoutForm";
import { getSession, getUsername } from "../lib/session";

export default  async function Navbar() {
    const session =  await getSession();
    let username; 
    if(session){
        username = await getUsername();
    }
    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">To Do App</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    {!session && <li><Link href="login">Login</Link></li>}
                    {session && <li><LogoutForm></LogoutForm></li> }
                    {!session && <li><Link href="register">Register</Link></li>} 
                    {session && <li><a>{username.user_name}</a></li>}
                    <li>
                        <details>
                            <summary>Parent</summary>
                            <ul className="bg-base-100 rounded-t-none p-2">
                                <li><a>Link 1</a></li>
                                <li><a>Link 2</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}