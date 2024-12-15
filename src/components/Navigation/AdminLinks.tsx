"use server"
import Link from "next/link";

export default async function AdminLinks() {
    return (
        <>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/admin">Administration</Link></li>
        </>
    )
}