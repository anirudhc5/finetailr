import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

function getFirebaseAdminApp(): App {
    if (!getApps().length) {
        return initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
                    /\\n/g,
                    "\n",
                ),
            }),
        });
    }
    return getApps()[0];
}

export function getAdminDb(): Firestore {
    return getFirestore(getFirebaseAdminApp());
}

export function getAdminAuth(): Auth {
    return getAuth(getFirebaseAdminApp());
}
