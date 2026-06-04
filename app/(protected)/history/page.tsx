"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { getApplications } from "@/lib/firestore";
import { Application } from "@/app/types";

export default function HistoryPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [apps, setApps] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        async function fetchApps() {
            const data = await getApplications(user!.uid);
            setApps(data);
            setLoading(false);
        }

        fetchApps();
    }, [user]);

    // Client-side search filters the list
    const filteredApplications = apps.filter(
        (app) =>
            app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.company.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl pt-[7rem]">
            {/* Header Section */}
            <div className="mb-xl">
                <h1 className="font-headline-xl text-headline-xl mb-sm">
                    Application History
                </h1>
                <p className="text-on-surface-variant font-body-lg">
                    Track and manage your tailored resume submissions.
                </p>
            </div>

            {/* Filter/Search Bar */}
            <div className="mb-lg flex flex-col md:flex-row gap-md justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        search
                    </span>
                    <input
                        className="w-full pl-10 pr-md py-sm rounded border border-outline-variant focus:ring-2 focus:ring-primary-container focus:border-primary outline-none transition-all"
                        placeholder="Search applications..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <p className="text-on-surface-variant">
                    Loading applications...
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                    {filteredApplications.map((app) => (
                        <div
                            key={app.id}
                            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-sm transition-all hover:-translate-y-1 duration-200 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-md">
                                    <div className="bg-primary-container/10 p-sm rounded-lg">
                                        <span className="material-symbols-outlined text-primary">
                                            description
                                        </span>
                                    </div>
                                </div>
                                <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">
                                    {app.title}
                                </h3>
                                <p className="text-on-surface-variant font-body-md mb-md">
                                    {app.company}
                                </p>
                                <div className="flex items-center gap-sm text-outline font-label-sm mb-lg">
                                    <span className="material-symbols-outlined text-[16px]">
                                        calendar_today
                                    </span>
                                    <span>Analyzed on {app.date}</span>
                                </div>
                            </div>
                            <button
                                onClick={() =>
                                    router.push(`/history/${app.id}`)
                                }
                                className="w-full py-sm bg-white border border-outline-variant rounded font-label-md text-on-surface hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-xs active:scale-[0.98] cursor-pointer"
                            >
                                View Details
                                <span className="material-symbols-outlined text-[18px]">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    ))}

                    {/* Empty State / New Analysis Card */}
                    <Link
                        href="/tailor"
                        className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-colors duration-300"
                    >
                        <div className="bg-surface-container p-md rounded-full mb-md group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                            <span className="material-symbols-outlined text-[32px]">
                                add
                            </span>
                        </div>
                        <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">
                            Analyze New Job
                        </h3>
                        <p className="text-on-surface-variant font-body-sm px-md">
                            Tailor your resume for another opportunity and track
                            it here.
                        </p>
                    </Link>
                </div>
            )}
        </main>
    );
}
