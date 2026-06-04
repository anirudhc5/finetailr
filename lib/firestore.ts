import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    getDoc,
    doc,
    orderBy,
    query,
} from "firebase/firestore";
import { Application } from "@/app/types";
import { GeminiResult } from "@/lib/gemini";

export async function getApplications(userId: string): Promise<Application[]> {
    const ref = collection(db, "users", userId, "applications");
    const q = query(ref, orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }),
    })) as Application[];
}

export async function getApplication(
    userId: string,
    appId: string,
): Promise<Application | null> {
    const ref = doc(db, "users", userId, "applications", appId);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...snapshot.data(),
        date: snapshot.data().date.toDate().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }),
    } as Application;
}

export async function saveApplication(
    userId: string,
    company: string,
    jobTitle: string,
    jobDescription: string,
    result: GeminiResult,
): Promise<void> {
    const ref = collection(db, "users", userId, "applications");
    await addDoc(ref, {
        company,
        title: jobTitle,
        description: jobDescription,
        matchedKeywords: result.matchedKeywords,
        missingKeywords: result.missingKeywords,
        tailoredBullets: result.tailoredBullets,
        recommendation: result.recommendation,
        date: serverTimestamp(),
    });
}
