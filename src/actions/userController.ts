"use server"
import prisma from "../lib/db"
import bcrypt from "bcrypt";
import { checkPassword } from "../lib/crypt"
import { createSession, deleteSession, verifySession } from "../lib/session";
import { redirect } from "next/navigation";
import { isEmpty } from "../lib/formats";

export const register = async function (prevState, formData: FormData) {
    const saltRounds = 10

    const username: string = formData.get('username').toString()
    const password: string = formData.get('password').toString()
    const password2: string = formData.get("password2").toString()
    const role: string = formData.get("role")?.toString()

    const errors: { username?: string, password?: string, role?: string } = {}

    if (username.length < 3) {
        errors.username = "Username muss mindestens drei Zeichen enthalten."
    }
    if (!password || !password2) {
        errors.password = "Es muss ein Passwort angegeben werden."
    }
    if (password !== password2) {
        errors.password = "Die Passwörter stimmen nicht überein."
    }

    if (!role) {
        errors.role = "Es muss eine Rolle ausgewählt werden."
    }


    const existingUser = await prisma.users.findFirst({
        where: {
            user_name: username
        },
        select: {
            user_name: true
        }
    })


    if (existingUser !== null) {
        errors.username = "Der Benutzername ist bereits vergeben."
    }


    if (!isEmpty(errors)) {
        return {
            errors,
            success: false
        }
    }

    const newUser: { username: string, password: string, role: string } = {
        username,
        password,
        role
    }

    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds)

    await prisma.users.create({
        data: {
            user_name: newUser.username,
            user_password: hashedPassword,
            user_role: newUser.role
        }
    })

    return redirect("/login")
}

export const login = async function (prevState, formData: FormData) {
    const username: string = formData.get("username").toString()
    const password: string = formData.get("password").toString()


    const user = await prisma.users.findUnique({
        where: {
            user_name: username
        }
    })

    if (!user) {
        return {
            errors: {
                password: 'Falsches Passwort oder kein Konto. '
            },
            success: false
        }
    }

    const matchingPassword = await checkPassword(password, user.user_password);
    if (matchingPassword) {
        await createSession(user.user_id)
        return redirect("/profile")
    }

    return {
        errors: {
            password: 'Falsches Passwort oder kein Konto. '
        },
        success: false
    }
}

export const logout = async function () {
    await deleteSession();
    redirect("/")
}

export async function getUser() {
    const session = await verifySession();
    const user = await prisma.$queryRaw`SELECT user_name, user_id, user_role from users INNER JOIN sessions on sessions.session_user_id = users.user_id WHERE sessions.session_id = ${session}`;
    if (!user[0]) {
        return { isLoggedIn: false, user: null }
    }

    return { isLoggedIn: true, user: user[0] };
}

