"use server"
import { revalidatePath } from "next/cache";
import prisma from "../lib/db";
import { isEmpty } from "../lib/formats";

export async function getProducts() {
    let res = await  prisma.products.findMany()
    //await new Promise((resolve) => setTimeout(resolve,1000))
    return res;
}

export async function addProduct(prevState, formData: FormData){
    const bezeichnung = formData.get('bezeichnung').toString()
    const beschreibung = formData.get('beschreibung').toString()
    const lagerbestand = parseInt(formData.get('lagerbestand').toString())
    let preis = formData.get('preis').toString()
    const aktiv = formData.get('aktiv')?.toString()
    
    preis = preis.replace(",",".");
    let preis_float = parseFloat(preis);

    const errors ={}

    let aktiv_int = 1
    if(aktiv === undefined){
        aktiv_int = 0
    }
    
    if(Number.isNaN(preis_float)){
        errors["preis"] = "Kein gültiger Preis."
    }
    
    if(bezeichnung === ""){
        errors["bezeichnung"] = "Dieses Feld muss ausgefüllt werden."
    }
    if(beschreibung === ""){
        errors["beschreibung"] = "Dieses Feld muss ausgefüllt werden."
    }

    if(Number.isNaN(lagerbestand) || (lagerbestand % 1) !== 0){
        errors["lagerbestand"] = "Es muss eine Ganzzahl eingegeben werden."
    }

    if(!isEmpty(errors)){
        return {
            errors,
            success: false
        }
    }


      await prisma.products.create({
        data: {
            product_name: bezeichnung,
            product_description: beschreibung,
            product_price: preis_float * 100,
            product_stock: lagerbestand,
            product_active: (aktiv_int === 0) ? false : true
        }
    })  

    revalidatePath("/admin/products")
    return {
        success: true
    }
    
}