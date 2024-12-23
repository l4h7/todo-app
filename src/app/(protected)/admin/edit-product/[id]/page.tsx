import ProductForm from "@/src/components/Admin/products/ProductForm";
import prisma from "@/src/lib/db";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {

    const product_id = await (await params).id
    const id = parseInt(product_id);

    const product = await prisma.products.findFirst({
        where: {
            product_id: id
        }
    })

    return (
        <>
            <div className="container mx-auto px-10">
                <ProductForm product={product}></ProductForm>
            </div>
        </>
    )
}