import prisma from "../lib/db";

export async function getProducts() {
    let res = await  prisma.products.findMany()
    await new Promise((resolve) => setTimeout(resolve,1000))
    return res;
}