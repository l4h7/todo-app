import { getUser } from "@/src/actions/userController";



export default async function Page() {
    const session = await getUser();
    
    return (
    <>
        <h1 className="text-3xl font-bold py-2">Profil</h1>
        <p>Dein Username: <strong>{session.user?.user_name}</strong></p>
        <p>Deine Rolle: <strong>{session.user?.user_role}</strong></p>
    </>)
}