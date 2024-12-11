"use sever"
import bcrypt from "bcrypt"

export async function checkPassword(password, passwordHash){
    return await bcrypt.compare(password, passwordHash)
}