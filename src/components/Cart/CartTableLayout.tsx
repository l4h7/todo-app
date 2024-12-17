import { formatter } from "@/src/lib/formats";

export default async function CartTableLayout( { total, children }) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Artikel</th>
                            <th>Beschreibung</th>
                            <th>Einzelpreis</th>
                            <th>Menge</th>
                            <th>Gesamtpreis</th>
                            <th>Aktionen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {children}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="font-bold text-lg">Gesamt</td>
                            <td className="font-bold text-lg">{formatter.format(total / 100)}<br></br><p className="text-xs font-normal">Inkl. 19 % UmSt.</p></td>
                        </tr>

                    </tbody>

                </table>
                <div className="flex justify-center mt-10">
                <button className="btn btn-primary w-full text-xl">Bestellen</button>
                </div>

            </div>
        </>
    )
}