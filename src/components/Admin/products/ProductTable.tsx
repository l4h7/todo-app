"use server"

import { formatter } from "@/src/lib/formats"
import Link from "next/link"

export default async function ProductTable({ products }) {
    const tableRows = products.map(p => {
        return (
            <tr>
                <td>{p.product_name}</td>
                <td>{p.product_description}</td>
                <td>{p.product_stock}</td>
                <td>{ formatter.format(p.product_price/100)}</td>
                <td>{p.product_active.toString() === "true" ? <div className="bg-green-500 w-5 h-5 p-0 m-0 rounded-3xl"></div> : <div className="bg-red-500 w-5 h-5 p-0 m-0 rounded-3xl"></div>}</td>
                <td>
                    <button className="btn btn-xs btn-warning lg:mx-2 lg:my-0 my-2">Bearbeiten</button>
                    <button className="btn btn-xs btn-error">Löschen</button>
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