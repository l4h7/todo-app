"use server"
import { cookies } from "next/headers"
import prisma from "../lib/db"
import { formatter } from "../lib/formats"

interface CartItemData {
    product_id: number,
    qty: number
}

export const addToCart = async function (prevState, formData: FormData) {
    const product_id: number = parseInt(formData.get('product_id').toString())
    const qty: number = parseInt(formData.get('qty').toString())
    const cookieStore = await cookies()

    let cart: CartItemData[]

    cart = JSON.parse(cookieStore.get('cart')?.value || '[]')

    const existingCartItem = cart.find(i => i.product_id == product_id);


    if (existingCartItem) {
        existingCartItem.qty += qty
    } else {
        cart.push({ product_id, qty })
    }

    cookieStore.set('cart', JSON.stringify(cart));
}

export const getCart = async function () {
    const cookieStore = await cookies();
    const cartData = cookieStore.get('cart')?.value
    if (!cartData) {
        return null
    }
    return JSON.parse(cartData)
}

export const sumCartQty = async function (obj) {
    let sum: number = 0
    for (let index in obj) {
        sum += obj[index].qty
    }
    return sum
}

export const getCartTotal = async function (obj) {
    let total = 0;

    for (let index in obj) {
        const price = await prisma.$queryRaw`SELECT product_price FROM products WHERE product_id =${obj[index].product_id}`
        total += price[0].product_price * obj[index].qty
    }

    return formatter.format(total/100)
}