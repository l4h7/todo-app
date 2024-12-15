"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

export default function NavbarLinks() {
    const path = usePathname();
    return (
        <>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link className={path === "/" ? "font-bold" : ""} href="/">Start</Link></li>

                        {/* <li>
                    <a>Parent</a>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </li> */}
                        <li><Link className={path === "/products" ? "font-bold" : ""} href="/products">Produkte</Link></li>
                        <li><Link className={path === "/sale" ? "font-bold" : ""} href="/">Sale</Link></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-sm font-black sm:text-lg text-left">Shishapoint <br className="sm:hidden "></br> Bad Wildungen</a>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link className={path === "/" ? "font-bold" : ""} href="/">Start</Link></li>
                    {/* <li>
                    <a>Parent</a>
                    <ul className="p-2">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                    </ul>
                </li> */}
                    <li><Link className={path === "/products" ? "font-bold" : ""} href="/products">Produkte</Link></li>
                    <li><Link className={path === "/sale" ? "font-bold" : ""} href="/">Sale</Link></li>
                </ul>
            </div>
        </>
    )
}