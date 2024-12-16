"use server"
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { isEmpty } from "../lib/formats";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/session";
import { getUser } from "./userController";

export async function getProducts() {
    let res = await prisma.products.findMany({
        where: {
            product_active: true
        }
    })
    //await new Promise((resolve) => setTimeout(resolve,1000))
    return res;
}

export async function deleteProduct(prevState, formData: FormData) {
    const session = await getUser();
    if(session.user.role !== "admin"){
        redirect("/login")
    }
    const product_id = parseInt(formData.get('product_id')?.toString())
    if(product_id !== null){
        await prisma.products.delete({
            where:{
                product_id: product_id
            }
        })
    }

    revalidatePath("/admin/products")
    redirect("/admin/products")

}

export async function addProduct(prevState, formData: FormData) {

    const session = await getUser();
    if(session.user.role !== "admin"){
        redirect("/login")
    }

    const bezeichnung = formData.get('bezeichnung').toString()
    const beschreibung = formData.get('beschreibung').toString()
    const lagerbestand = parseInt(formData.get('lagerbestand').toString())
    let preis = formData.get('preis').toString()
    const aktiv = formData.get('aktiv')?.toString()
    const product_id = parseInt(formData.get('product_id')?.toString())

    preis = preis.replace(",", ".");
    let preis_float = parseFloat(preis);

    const errors: { bezeichnung?: string, beschreibung?: string, lagerbestand?: string, preis?: string } = {}

    let aktiv_int = 1
    if (aktiv === undefined) {
        aktiv_int = 0
    }

    if (Number.isNaN(preis_float)) {
        errors.preis = "Kein gültiger Preis."
    }

    if (bezeichnung === "") {
        errors.bezeichnung = "Dieses Feld muss ausgefüllt werden."
    }
    if (beschreibung === "") {
        errors.beschreibung = "Dieses Feld muss ausgefüllt werden."
    }

    if (Number.isNaN(lagerbestand) || (lagerbestand % 1) !== 0) {
        errors.lagerbestand = "Es muss eine Ganzzahl eingegeben werden."
    }

    if (!isEmpty(errors)) {
        return {
            errors,
            success: false
        }
    }

    const newProduct: { product_name: string, product_description: string, product_stock: number, product_price: number, product_active: boolean } = {
        product_name: bezeichnung,
        product_description: beschreibung,
        product_price: preis_float * 100,
        product_stock: lagerbestand,
        product_active: (aktiv_int === 0) ? false : true
    }
    console.log(product_id)

    if (!Number.isNaN(product_id)) {
        await prisma.products.update({
            where: {
                product_id: product_id
            },
            data: {
                product_name: newProduct.product_name,
                product_description: newProduct.product_description,
                product_price: newProduct.product_price,
                product_stock: newProduct.product_stock,
                product_active: newProduct.product_active
            }
        })
    }
    else {
        await prisma.products.create({
            data: {
                product_name: newProduct.product_name,
                product_description: newProduct.product_description,
                product_price: newProduct.product_price,
                product_stock: newProduct.product_stock,
                product_active: newProduct.product_active
            }
        })
    }

    revalidatePath("/admin/products")
    redirect("/admin/products")


}