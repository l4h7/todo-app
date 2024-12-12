"use client"
import { logout } from "../actions/userController"

export default function LogoutForm() {
    return (<div>
        <form action={logout}>
            <button>Logout</button>
        </form>
    </div>)
}