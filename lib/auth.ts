import {
    UserCredential,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const provider: GoogleAuthProvider = new GoogleAuthProvider();

async function sign_in(): Promise<UserCredential> {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("Sign-in successful!");
        return result;
    } catch {
        throw new Error("Sign-in failure");
    }
}
async function sign_out() {
    await signOut(auth);
}

export { sign_in, sign_out };
