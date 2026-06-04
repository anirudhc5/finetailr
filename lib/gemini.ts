import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { Experience, Project } from "@/app/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Zod schema — this is the guaranteed shape of Gemini's response
const analysisSchema = z.object({
    matchedKeywords: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    tailoredBullets: z.array(
        z.object({
            original: z.string(),
            rewritten: z.string(),
        }),
    ),
    recommendation: z.string(),
});

// Infer the TypeScript type from the Zod schema — no need to define it twice
export type GeminiResult = z.infer<typeof analysisSchema>;

interface ProfileData {
    name: string;
    skills: string[];
    experiences: Experience[];
    projects: Project[];
}

function buildPrompt(profile: ProfileData, jobDescription: string): string {
    const experienceBlock = profile.experiences
        .map(
            (exp) =>
                `Company: ${exp.company}
Role: ${exp.role}
(${exp.startDate} - ${exp.endDate ?? "Present"})
Description: ${exp.description}`,
        )
        .join("\n\n");

    const projectBlock = profile.projects
        .map(
            (p) =>
                `Project: ${p.name}
Description: ${p.description}`,
        )
        .join("\n\n");

    return `
You are a professional resume coach helping a college student tailor their resume to a job description.

## Candidate Profile
Name: ${profile.name}
Skills: ${profile.skills.join(", ")}

### Experience
${experienceBlock}

### Projects
${projectBlock}

## Job Description
${jobDescription}

## Your Task
1. Identify keywords from the job description that appear in the candidate's profile (matchedKeywords).
2. Identify important keywords from the job description that are missing from the profile (missingKeywords).
3. Rewrite each experience description as strong, specific resume bullets tailored to the job description. Do NOT fabricate experience.
4. Write a short prioritization recommendation advising which experiences and projects to lead with on a one-page resume given this specific job.
`.trim();
}

export async function analyzeWithGemini(
    profile: ProfileData,
    jobDescription: string,
): Promise<GeminiResult> {
    const prompt = buildPrompt(profile, jobDescription);

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: z.toJSONSchema(analysisSchema),
        },
    });

    const raw = response.text;
    if (!raw) throw new Error("Gemini returned an empty response.");
    const parsed = analysisSchema.parse(JSON.parse(raw));
    return parsed;
}
