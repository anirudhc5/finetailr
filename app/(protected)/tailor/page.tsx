"use client";

import { useState } from "react";
import { GeminiResult } from "@/lib/gemini";
import { useAuth } from "@/lib/AuthContext";
import { saveApplication } from "@/lib/firestore";

export default function TailorPage() {
    const [company, setCompany] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<GeminiResult | null>(null);

    // Mocks representing the analysis results (all static placeholders with // TODO)
    const { user } = useAuth();
    const matchedKeywords = results?.matchedKeywords ?? [];
    const missingKeywords = results?.missingKeywords ?? [];
    const rewrittenBullets = results?.tailoredBullets ?? [];

    // SVG parameters

    const handleAnalyze = async () => {
        if (!user) return;
        if (!company || !jobTitle || !jobDescription) {
            alert("Please fill in all fields before analyzing.");
            return;
        }

        setLoading(true);

        try {
            const idToken = await user.getIdToken();
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    jobDescription,
                    company,
                    jobTitle,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Analysis failed.");
            }

            setResults(data);
        } catch (error) {
            console.error("Analysis error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!user || !results) {
            alert("Nothing to save yet. Run an analysis first.");
            return;
        }

        try {
            await saveApplication(
                user.uid,
                company,
                jobTitle,
                jobDescription,
                results,
            );
            alert("Application saved!");
        } catch (error) {
            console.error("Save error:", error);
            alert("Failed to save. Please try again.");
        }
    };

    const handleReset = () => {
        setCompany("");
        setJobTitle("");
        setJobDescription("");
    };

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        });
    };

    return (
        <main className="max-w-container-max mx-auto px-lg py-xl pt-[7rem]">
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-xl">
                {/* Left Column: Input Form */}
                <section className="lg:col-span-5 space-y-lg">
                    <div className="space-y-sm">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface">
                            Tailor Application
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Optimize your resume for a specific job description
                            in seconds.
                        </p>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg space-y-md shadow-soft">
                        <div className="grid grid-cols-2 gap-md">
                            <div className="space-y-xs">
                                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                                    Company Name
                                </label>
                                <input
                                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-md font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                                    placeholder="e.g. FineTailr"
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                            <div className="space-y-xs">
                                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block">
                                    Job Title
                                </label>
                                <input
                                    className="w-full bg-surface-container-lowest border border-outline-variant rounded p-md font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                                    placeholder="e.g. Fullstack Engineer"
                                    type="text"
                                    value={jobTitle}
                                    onChange={(e) =>
                                        setJobTitle(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="space-y-xs">
                            <div className="flex justify-between items-center">
                                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                                    Job Description
                                </label>
                                <span className="text-label-sm text-outline">
                                    Characters: {jobDescription.length}
                                </span>
                            </div>
                            <textarea
                                className="custom-scrollbar w-full bg-surface-container-lowest border border-outline-variant rounded p-md font-body-md text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all resize-none"
                                placeholder="Paste the full job description text here..."
                                rows={12}
                                value={jobDescription}
                                onChange={(e) =>
                                    setJobDescription(e.target.value)
                                }
                            ></textarea>
                        </div>
                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full py-md bg-primary-container text-on-primary font-bold rounded-lg hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-sm cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Analyzing..." : "Analyze My Resume"}
                        </button>
                    </div>
                </section>

                {/* Right Column: Results Area */}
                <section className="lg:col-span-7 space-y-lg">
                    {/* Score & Keywords Bento Grid */}
                    {/* Keywords Analysis */}
                    <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-soft">
                        <div className="space-y-md">
                            <div>
                                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm block">
                                    Matched Keywords
                                </h3>
                                <div className="flex flex-wrap gap-xs">
                                    {matchedKeywords.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-md py-xs bg-green-50 text-green-700 border border-green-200 rounded-full text-label-md flex items-center gap-xs font-medium"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                check_circle
                                            </span>{" "}
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm block">
                                    Missing Keywords
                                </h3>
                                <div className="flex flex-wrap gap-xs">
                                    {missingKeywords.map((kw, i) => (
                                        <span
                                            key={i}
                                            className="px-md py-xs bg-tertiary-fixed text-on-tertiary-fixed-variant border border-tertiary-fixed-dim rounded-full text-label-md flex items-center gap-xs font-medium"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">
                                                add_circle
                                            </span>{" "}
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {results?.recommendation && (
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-soft">
                            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm block">
                                Prioritization Recommendation
                            </h3>
                            <p className="font-body-md text-on-surface">
                                {results.recommendation}
                            </p>
                        </div>
                    )}

                    {/* Suggested Bullet Rewrites */}
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-soft">
                        <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
                            <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                                Suggested Bullet Rewrites
                            </h3>
                            <span className="text-label-sm text-primary flex items-center gap-xs font-semibold">
                                <span className="material-symbols-outlined text-[18px]">
                                    auto_awesome
                                </span>{" "}
                                AI-Powered
                            </span>
                        </div>
                        <div className="divide-y divide-outline-variant">
                            {rewrittenBullets.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg bg-white"
                                >
                                    <div className="space-y-xs">
                                        <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60 block">
                                            Original
                                        </span>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                                            &quot;{item.original}&quot;
                                        </p>
                                    </div>
                                    <div className="space-y-xs">
                                        <div className="flex items-center justify-between">
                                            <span className="font-label-sm text-label-sm text-primary font-semibold">
                                                Rewritten
                                            </span>
                                            <button
                                                onClick={() =>
                                                    copyToClipboard(
                                                        item.rewritten,
                                                        index,
                                                    )
                                                }
                                                className="material-symbols-outlined text-outline hover:text-primary text-[18px] cursor-pointer flex items-center gap-1 select-none"
                                                title="Copy rewritten bullet"
                                            >
                                                {copiedIndex === index ? (
                                                    <span className="font-label-sm text-primary font-medium tracking-normal text-[12px] normal-case">
                                                        Copied!
                                                    </span>
                                                ) : (
                                                    "content_copy"
                                                )}
                                            </button>
                                        </div>
                                        <p className="font-body-md text-body-md text-on-surface font-medium border-l-2 border-primary-container pl-md">
                                            &quot;{item.rewritten}&quot;
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-md">
                        <button
                            onClick={handleReset}
                            className="px-lg py-md text-on-surface font-medium hover:bg-surface-container transition-colors rounded-lg cursor-pointer"
                        >
                            Reset All
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-xl py-md bg-inverse-surface text-inverse-on-surface font-bold rounded-lg hover:opacity-90 transition-all active:scale-95 flex items-center gap-sm cursor-pointer"
                        >
                            Save Application
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}
