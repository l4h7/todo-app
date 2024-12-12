"use server"
import prisma from "../lib/db"

export const getAllProducts = async function () {
    const data = await prisma.products.findMany();
    console.log(data)
    return data;
}