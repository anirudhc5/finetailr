"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { getApplication } from "@/lib/firestore";
import { Application } from "@/app/types";

export default function ApplicationDetailPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [app, setApp] = useState<Application | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function fetchApp() {
            const data = await getApplication(user!.uid, id);
            if (!data) {
                router.push("/history");
                return;
            }
            setApp(data);
            setLoading(false);
        }

        fetchApp();
    }, [user, id]);

    if (loading)
        return (
            <main className="max-w-container-max mx-auto px-lg py-xl pt-[7rem]">
                <p className="text-on-surface-variant font-body-md">
                    Loading...
                </p>
            </main>
        );

    return (
        <main className="max-w-container-max mx-auto px-lg py-xl pt-[7rem]">
            {/* Header */}
            <div className="mb-xl">
                <button
                    onClick={() => router.push("/history")}
                    className="flex items-center gap-xs text-on-surface-variant hover:text-primary mb-md transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    Back to History
                </button>
                <h1 className="font-headline-xl text-headline-xl mb-xs">
                    {app!.title}
                </h1>
                <p className="text-on-surface-variant font-body-lg">
                    {app!.company} · Analyzed on {app!.date}
                </p>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mb-xl">
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                    <h2 className="font-headline-sm mb-md text-on-surface">
                        Matched Keywords
                    </h2>
                    <div className="flex flex-wrap gap-sm">
                        {app!.matchedKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="bg-green-100 text-green-800 text-sm px-sm py-xs rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                    <h2 className="font-headline-sm mb-md text-on-surface">
                        Missing Keywords
                    </h2>
                    <div className="flex flex-wrap gap-sm">
                        {app!.missingKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="bg-red-100 text-red-800 text-sm px-sm py-xs rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tailored Bullets */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg mb-xl">
                <h2 className="font-headline-sm mb-md text-on-surface">
                    Tailored Bullets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    <div>
                        <p className="font-label-md text-on-surface-variant mb-sm">
                            Original
                        </p>
                        <ul className="space-y-sm">
                            {app!.tailoredBullets.map((b, i) => (
                                <li
                                    key={i}
                                    className="text-on-surface font-body-md border-l-2 border-outline-variant pl-sm"
                                >
                                    {b.original}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-label-md text-on-surface-variant mb-sm">
                            Rewritten
                        </p>
                        <ul className="space-y-sm">
                            {app!.tailoredBullets.map((b, i) => (
                                <li
                                    key={i}
                                    className="text-on-surface font-body-md border-l-2 border-primary pl-sm"
                                >
                                    {b.rewritten}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Job Description */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                <h2 className="font-headline-sm mb-md text-on-surface">
                    Job Description
                </h2>
                <p className="text-on-surface font-body-md whitespace-pre-wrap">
                    {app!.description}
                </p>
            </div>
        </main>
    );
}
