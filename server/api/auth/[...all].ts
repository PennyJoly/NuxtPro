import { auth } from "~/lib/auth/auth"; 
 
export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event)); 
}); 