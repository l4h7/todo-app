import { NextResponse } from "next/server";
import { verifySession } from "./lib/session";

export async function middleware(request) {
    const protectedRoutes = ['/profile']
    const currentPath = request.nextUrl.pathname
    
    if(protectedRoutes.includes(currentPath)){
        //DB Abfrage ohne Prisma integrieren
        const session = await verifySession()
        if(!session){
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/profile']
}