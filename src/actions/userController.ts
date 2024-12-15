"use server"
import prisma from "../lib/db"
import bcrypt from "bcrypt";
import { checkPassword } from "../lib/crypt"
import { createSession, deleteSession, verifySession } from "../lib/session";
import { redirect, RedirectType } from "next/navigation";

export const register = async function (prevState,  formData: FormData) {
    const errors: { username?: string } = {}
    const saltRounds = 10

    const newUser: { username: string, password: string } = {
        username: formData.get('username').toString(),
        password: formData.get('password').toString()
    }

    if (newUser.username.length < 3) {
        errors.username = "Username muss mindestens drei Zeichen enthalten."
    }

    if (errors.username) {
        return { errors, success: false }
    }


    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds)

    const user = await prisma.users.create({
        data: {
            user_name: newUser.username,
            user_password: hashedPassword
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
        console.log("NO USER")
        return {
            errors: {
                password: 'Falsches Passwort oder kein Konto. '
            },
            success: false
        }
    }

    const matchingPassword = await checkPassword(password, user.user_password);
    if (matchingPassword) {
        console.log("MATCHING PW")
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
    if(!user[0]){
        return {isLoggedIn: false, user: null}
    }

    return { isLoggedIn: true, user: user[0]};
}

