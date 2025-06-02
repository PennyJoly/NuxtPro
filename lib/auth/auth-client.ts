import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/vue";
import type { auth } from "./auth"

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
});

export const googleSignIn = async () => {
	const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
        errorCallbackURL: "/error",
    })
	console.log("googleSignIn data:", data);
}

export const githubSignIn = async () => {
	const data = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/", 
        errorCallbackURL: "/error",
    })
	console.log("githubSignIn data:", data);
}

export const {
	signIn,
	signOut,
	signUp,
	useSession,
	forgetPassword,
	resetPassword,
	deleteUser
} = authClient;