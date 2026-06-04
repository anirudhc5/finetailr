import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { analyzeWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { userId, jobDescription, company, jobTitle } = await req.json();

        if (!userId || !jobDescription || !company || !jobTitle) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 },
            );
        }

        // Fetch the user's profile from Firestore
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            return NextResponse.json(
                { error: "User profile not found." },
                { status: 404 },
            );
        }

        const profile = userSnap.data();

        const result = await analyzeWithGemini(
            {
                name: profile.name,
                skills: profile.skills ?? [],
                experiences: profile.experiences ?? [],
                projects: profile.projects ?? [],
            },
            jobDescription,
        );

        return NextResponse.json(result);
    } catch (error) {
        console.error("Analysis error:", error);
        return NextResponse.json(
            { error: "Something went wrong during analysis." },
            { status: 500 },
        );
    }
}
