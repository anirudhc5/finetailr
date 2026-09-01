import { NextRequest, NextResponse } from "next/server";
import { getAdminDb, getAdminAuth } from "@/lib/firebaseAdmin";
import { analyzeWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Unauthorized: Missing Authorization header" },
                { status: 401 },
            );
        }

        const token = authHeader.split("Bearer ")[1];
        let decodedToken;
        try {
            decodedToken = await getAdminAuth().verifyIdToken(token);
        } catch (error) {
            console.error("Token verification failed:", error);
            return NextResponse.json(
                { error: "Unauthorized: Invalid token" },
                { status: 401 },
            );
        }

        const userId = decodedToken.uid;
        const { jobDescription, company, jobTitle } = await req.json();

        if (!jobDescription || !company || !jobTitle) {
            return NextResponse.json(
                { error: "Missing required fields." },
                { status: 400 },
            );
        }

        // Fetch the user's profile from Firestore using Admin SDK
        const userSnap = await getAdminDb()
            .collection("users")
            .doc(userId)
            .get();

        if (!userSnap.exists) {
            return NextResponse.json(
                { error: "User profile not found." },
                { status: 404 },
            );
        }

        const profile = userSnap.data();
        if (!profile) {
            return NextResponse.json(
                { error: "User profile has no data." },
                { status: 400 },
            );
        }

        console.log(profile);

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
