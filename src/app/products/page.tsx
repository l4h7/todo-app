"use server"
import { getProducts } from "@/src/actions/productController"
import ProductCard from "@/src/components/ProductCard"
import prisma from "@/src/lib/db"
import { Suspense } from "react"

export default async function Page() {
    const products  = await getProducts()

    return (
        <>
            <h1 className="font-black text-3xl">Produkte</h1>
            <div className="flex flex-wrap mt-4">
                {products.map(p => <ProductCard key={p.product_id} product={{id: p.product_id, name: p.product_name, description:p.product_description, price:p.product_price}}></ProductCard>)}
            </div>
        </>
    )
}