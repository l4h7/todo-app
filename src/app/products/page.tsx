"use server"
import { getProducts } from "@/src/actions/productController"
import ProductCard from "@/src/components/ProductCard"

export default async function Page() {
    const products  = await getProducts()

    return (
        <>
        <div className="container mx-auto p-10">

            <h1 className="font-black text-3xl mt-8">Produkte</h1>
            <div className="flex flex-wrap mt-4">
                {products.map(p => <ProductCard key={p.product_id} product={{id: p.product_id, name: p.product_name, description:p.product_description, price:p.product_price}}></ProductCard>)}
            </div>
        </div>
        </>
    )
}