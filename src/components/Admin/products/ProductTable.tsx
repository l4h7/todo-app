"use server"

import { formatter } from "@/src/lib/formats"
import Link from "next/link"
import ProductDeleteButton from "./ProductDelete"

export default async function ProductTable({ products }) {
    const tableRows = products.map(p => {
        return (
            <tr>
                <td>{p.product_name}</td>
                <td>{p.product_description}</td>
                <td>{p.product_stock}</td>
                <td>{formatter.format(p.product_price / 100)}</td>
                <td>{p.product_active.toString() === "true" ? <div className="bg-green-500 w-5 h-5 p-0 m-0 rounded-3xl"></div> : <div className="bg-red-500 w-5 h-5 p-0 m-0 rounded-3xl"></div>}</td>
                <td>
                    <div className="flex flex-wrap">
                        <Link href={`/admin/edit-product/${p.product_id}`} className="btn btn-xs btn-warning lg:mx-2 lg:my-2 my-1">Bearbeiten</Link>
                        <ProductDeleteButton product_id={p.product_id}></ProductDeleteButton>
                    </div>
                </td>
            </tr>
        )
    })


    return (
        <>
            <Link href="/admin/add-product" className="btn btn-success text-white my-6">Neues Produkt anlegen</Link>
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Bezeichnung</th>
                            <th>Beschreibung</th>
                            <th>Lagerbestand</th>
                            <th>Preis</th>
                            <th>Aktiv?</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        </>
    )
}