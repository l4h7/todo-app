
import Link from "next/link";

export default  async function Navbar() {
    return (
        <div className="navbar">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">To Do App</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="login">Login</Link></li>
                    <li><Link href="register">Register</Link></li>
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