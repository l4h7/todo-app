import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import prisma from './db'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        console.log('Failed to verify session')
    }
}

export async function verifySession() {
    const session = (await cookies()).get('session')?.value

    if (!session) {
        return null;
    }

    return session;
}

export async function createSession(userId: number) {
    if (await verifySession()) {
        await deleteSession();
    }
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    const user_sessions = await prisma.sessions.findMany({
        where: {
            session_id: session,
        }
    })

    if (user_sessions.length != 0) {
        await updateSession();
        return null;
    }

    await prisma.sessions.create({
        data: {
            session_id: session,
            session_user_id: userId,
            session_expiresAt: expiresAt,
        }
    })


}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })


    await prisma.sessions.update({
        where: {
            session_id: session,
        },
        data: {
            session_expiresAt: expires
        }
    })

}

export async function deleteSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null;
    }

    const cookieStore = await cookies()
    cookieStore.delete('session')
    

    const db_session = await prisma.sessions.findFirst({
        where: {
            session_id: session
        }
    })

    if(!db_session){
        return null;
    }
     await prisma.sessions.delete({
        where: {
            session_id: session,
        }
    }) 
    return true;
}


