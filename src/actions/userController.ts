"use server"
import prisma from "../lib/db"
import bcrypt from "bcrypt";
import { checkPassword } from "../lib/crypt"

export const register = async function (prevState, formData: FormData) {
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

    return {
        success: true
    }
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
        //todo: session setzen
        
        console.log(`Hallo ${user.user_name}!`)
        return {
            success: true
        }
    }

    console.log(`Du kommst hier nicht rein.`)
    return {
        errors: {
            password: 'Falsches Passwort oder kein Konto. '
        },
        success: false
    }
}

