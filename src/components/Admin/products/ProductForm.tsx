"use client"

import { addProduct } from "@/src/actions/productController";
import { useActionState } from "react";
import Alert from "../../Alert";


export default function ProductForm({product}){

    const initialState = {
        errors:{},
        success: null
      }

    const [formState, formAction, pending] = useActionState(addProduct, initialState )

    return (
        <div className="mx-auto">
        <form action={formAction}>
            <div className="grid grid-cols-4 gap-4 text-gray-800">
                <div className="col-span-4">
                    <label className="text-sm font-bold pb-2" htmlFor="bezeichnung">Bezeichnung:</label>
                    <input name="bezeichnung" type="text" placeholder="Bezeichnung" className="input input-bordered w-full" />
                    {formState?.errors?.bezeichnung && <Alert type="warning">{formState.errors.bezeichnung}</Alert>}
                </div>
                <div className="col-span-4">
                    <label className="text-sm font-bold pb-2" htmlFor="beschreibung">Beschreibung:</label>
                    <textarea name="beschreibung" className="textarea textarea-bordered w-full" placeholder="Produktbeschreibung"></textarea>
                    {formState?.errors?.beschreibung && <Alert type="warning">{formState.errors.beschreibung}</Alert>}

                </div>
                <div className="col-span-2">
                    <label className=" text-sm font-bold pb-2" htmlFor="lagerbestand">Lagerbestand:</label>
                    <input name="lagerbestand" type="number" placeholder="Lagerbestand" className="input input-bordered w-full" />
                    {formState?.errors?.lagerbestand && <Alert type="warning">{formState.errors.lagerbestand}</Alert>}

                </div>
                <div className="col-span-2"></div>
                <div className="col-span-2">
                    <label className="  text-sm font-bold pb-2" htmlFor="preis">Preis:</label>
                    <input name="preis" type="text" placeholder="Preis" className="input input-bordered w-full" />
                    {formState?.errors?.preis && <Alert type="warning">{formState.errors.preis}</Alert>}

                </div>
                <div className="col-span-4">
                    <label className="text-sm font-bold pb-2" htmlFor="time">Aktiv?</label><br></br>
                    <input name="aktiv" type="checkbox" defaultChecked className="checkbox" />
                </div>
                <div className="col-span-4"></div>
                <div>
                    <input type="hidden" name="event_id" defaultValue={product?.product_id}></input>
                    <button disabled={pending} className="btn btn-success text-lg text-white">Hinzufügen</button>
                </div>
            </div>
        </form>
    </div>
    )
}