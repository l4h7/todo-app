"use client"

import { deleteProduct } from "@/src/actions/productController"
import { useActionState } from "react"

export default  function ProductDeleteButton({product_id}) {
    const [formState, formAction, pending] = useActionState(deleteProduct, {})
    return (
        <>
            <form action={formAction}>
                <input type="hidden" name="product_id" defaultValue={product_id} />
                <button className="btn btn-xs btn-error lg:mx-2 my-2">Löschen</button>
            </form>
        </>
    )
}