import { getUser } from "@/src/actions/userController";
import Link from "next/link";



export default async function Page() {
    const session = await getUser();

    return (
        <>
            <div className="container max-w-xl mx-auto p-2">

                <h1 className="text-3xl font-black py-2 mt-10 mb-4">Dein Profil</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold">Benutzername</div>
                    <div>{session.user?.user_name}</div>
                    <div className="font-bold">Name</div>
                    <div>Lucas Hufeland</div>
                    <div className="font-bold">Lieferadresse</div>
                    <div>Karlshafener Str. 31<br></br>34128 Kassel</div>
                    <div className="font-bold">Rechnungsadresse</div>
                    <div>Karlshafener Str. 31<br></br>34128 Kassel</div>
                </div>

                <button className="btn btn-primary mt-8">Daten ändern</button>

                <h1 className="text-3xl font-black py-2 mt-10 mb-4">Deine Bestellungen</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="font-bold">17.12.2024</div>
                    <div>
                        <ul>
                            <li>3 Artikel für 29,95 €</li>
                            <li><Link className="text-blue-800" href="/">Link zur Bestellübersicht</Link></li>
                        </ul>
                    </div>
                    <div className="font-bold">17.12.2024</div>
                    <div>
                        <ul>
                            <li>3 Artikel für 29,95 €</li>
                            <li><Link className="text-blue-800" href="/">Link zur Bestellübersicht</Link></li>
                        </ul>
                    </div>
                    <div className="font-bold">17.12.2024</div>
                    <div>
                        <ul>
                            <li>3 Artikel für 29,95 €</li>
                            <li><Link className="text-blue-800" href="/">Link zur Bestellübersicht</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>)
}