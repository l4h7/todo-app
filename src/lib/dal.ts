import prisma from "./db";
import { verifySession } from "./session";

export async function getUser() {
    const session = await verifySession();
    const user = await prisma.$queryRaw`SELECT user_name, user_id, user_role from users INNER JOIN sessions on sessions.session_user_id = users.user_id WHERE sessions.session_id = ${session}`;
    
    if(!user[0]){
        return {isLoggedIn: false, user: null}
    }

    return { isLoggedIn: true, user: user[0]};
}
