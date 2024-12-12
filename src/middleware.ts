import { NextResponse } from "next/server";
import { getSession } from "./lib/session";

export async function middleware(request) {
    const protectedRoutes = ['/todo']
    const currentPath = request.nextUrl.pathname
    
    if(protectedRoutes.includes(currentPath)){
        const session = await getSession()
        if(!session){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/todo']
}