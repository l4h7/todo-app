"use client"

import { addToCart } from "@/src/actions/cartController"
import { useActionState } from "react"

export default function Page() {
    const [formState, formAction] = useActionState(addToCart, {})
    return (
        <>
            <h1 className="font-black text-3xl">Produkte</h1 >
            <form className="my-4" action={formAction}>
                <div>
                    <p>Testprodukt - 10,99 €</p>
                    <input type="hidden" name="product_id" value="1"></input>
                    <input type="number" name="qty" defaultValue={1}></input>
                    <button className="btn btn-success text-white px-8 mt-2">In den Warenkorb!</button>
                </div>
                </form>
                <form action={formAction}>
                <div>

                    <p>Testprodukt - 10,99 €</p>
                    <input type="hidden" name="product_id" value="2"></input>
                    <input type="number" name="qty" defaultValue={1}></input>
                    <button className="btn btn-success text-white px-8 mt-2">In den Warenkorb!</button>
                </div >
            </form>
        </>
    )
}