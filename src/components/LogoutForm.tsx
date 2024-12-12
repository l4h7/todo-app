"use client"
import Link from "next/link"
import { logout } from "../actions/userController"

export default function LogoutForm(props) {
    return (<>
        <li>
            <details>
                <summary>{props.username}</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
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