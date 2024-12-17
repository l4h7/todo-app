"use client"

import { addProduct } from "@/src/actions/productController";
import { useActionState } from "react";
import Alert from "../../Alert";
import { formatter, isEmpty } from "@/src/lib/formats";
import { useRouter } from "next/navigation";


export default function ProductForm({ product }) {
    const router = useRouter()

    const initialState = {
        errors: {},
        success: null
    }

    if(isEmpty(product)){
        product = null
    }

    const [formState, formAction, pending] = useActionState(addProduct, initialState)

    return (
        <div className="mx-auto  mt-8">
                <h1 className="text-3xl font-black my-4">{product ? "Produkt bearbeiten" : "Produkt hinzufügen"}</h1>

            <form action={formAction}>
                <div className="grid grid-cols-4 gap-4 text-gray-800">
                    <div className="col-span-4">
                        <label className="text-sm font-bold pb-2" htmlFor="bezeichnung">Bezeichnung:</label>
                        <input name="bezeichnung" type="text" placeholder="Bezeichnung" className="input input-bordered w-full" defaultValue={product?.product_name} />
                        {formState?.errors?.bezeichnung && <Alert type="warning">{formState.errors.bezeichnung}</Alert>}
                    </div>
                    <div className="col-span-4">
                        <label className="text-sm font-bold pb-2" htmlFor="beschreibung">Beschreibung:</label>
                        <textarea name="beschreibung" className="textarea textarea-bordered w-full" placeholder="Produktbeschreibung" defaultValue={product?.product_description}></textarea>
                        {formState?.errors?.beschreibung && <Alert type="warning">{formState.errors.beschreibung}</Alert>}

                    </div>
                    <div className="col-span-2">
                        <label className=" text-sm font-bold pb-2" htmlFor="lagerbestand">Lagerbestand:</label>
                        <input name="lagerbestand" type="number" placeholder="Lagerbestand" className="input input-bordered w-full" defaultValue={product?.product_stock} />
                        {formState?.errors?.lagerbestand && <Alert type="warning">{formState.errors.lagerbestand}</Alert>}

                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-2">
                        <label className="  text-sm font-bold pb-2" htmlFor="preis">Preis:</label>
                        <input name="preis" type="text" placeholder="Preis" className="input input-bordered w-full" defaultValue={product && product?.product_price / 100} />
                        {formState?.errors?.preis && <Alert type="warning">{formState.errors.preis}</Alert>}

                    </div>
                    <div className="col-span-4">
                        <label className="text-sm font-bold pb-2" htmlFor="time">Aktiv?</label><br></br>
                        <input name="aktiv" type="checkbox" defaultChecked={product?.product_active} className="checkbox" />
                    </div>
                    <div className="col-span-4">
                        <input type="hidden" name="product_id" defaultValue={product?.product_id}></input>
                        <button disabled={pending} className="btn btn-primary text-lg text-white">{product ? "Ändern" : "Hinzufügen"}</button>
                        <button className="btn btn-warning m-4 px-6" onClick={() => router.back()}>Zurück</button>
                    </div>
                </div>
            </form>
        </div>
    )
}