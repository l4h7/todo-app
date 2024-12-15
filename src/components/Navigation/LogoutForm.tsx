"use server"
import Link from "next/link"
import { logout } from "../../actions/userController"

export default async function LogoutForm(props) {
    return (<>
        <li>
            <details>
                <summary>{props.username}</summary>
                <ul className="bg-base-100 rounded-t-none right-0 p-2">
                    {props.children}
                    <li><Link href="/profile">Profil</Link></li>
                    <li>
                        <form action={logout}>
                            <button>Logout</button>
                        </form>
                    </li>
                </ul>
            </details>
        </li>
    </>)
}