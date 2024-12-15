"use server"

import ProductTable from "@/src/components/Admin/products/ProductTable";
import prisma from "@/src/lib/db";
import { verifySession } from "@/src/lib/session";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await verifySession();
    if (!session) {
        return redirect("/login")
    }

    const products = await prisma.products.findMany();

    

    return (
        <>
            <h1 className="font-black text-3xl">Produkte hinzufügen oder bearbeiten</h1>
            <ProductTable products={products}></ProductTable>
        </>
    )
}