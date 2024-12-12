import { updateSession } from "@/src/lib/session";

export async function GET(request: Request) {
    await updateSession()
    return Response.json({"status": "Erfolg"})
}