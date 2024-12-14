import { deleteSession } from "@/src/lib/session"
import { redirect } from "next/navigation"


export async function GET(request: Request) {
    return Response.json(await deleteSession())
}