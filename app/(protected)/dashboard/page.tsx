"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    // Handle card hover interactive style shifts using standard CSS transition classes.
    // We avoid using direct style updates via JS where possible.

    return (
        <div className="bg-background text-on-background flex flex-col">
            {/* Main Content */}
            <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl pt-[7rem]">
                {/* Welcome Header */}
                <section className="mb-xl">
                    <h1 className="font-headline-xl text-headline-xl mb-xs">
                        Welcome back
                        {user ? `, ${user.displayName?.split(" ")[0]}!` : "!"}
                    </h1>
                </section>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
                    {/* Hero Card: Tailor My Resume (Large) */}
                    <div
                        onClick={() => router.push("/tailor")}
                        className="md:col-span-8 group relative overflow-hidden bg-primary-container rounded-xl p-xl flex flex-col justify-between min-h-[360px] border border-primary transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
                    >
                        <div className="absolute top-0 right-0 p-lg opacity-20 pointer-events-none">
                            <span className="material-symbols-outlined text-[120px]">
                                auto_fix_high
                            </span>
                        </div>
                        <div>
                            <span className="inline-block px-sm py-xs bg-surface-container-lowest text-primary text-label-sm font-label-sm rounded-lg mb-md">
                                AI-Powered
                            </span>
                            <h2 className="font-headline-lg text-headline-lg text-on-primary-container mb-md">
                                Tailor My Resume
                            </h2>
                            <p className="text-on-primary-container opacity-90 font-body-md text-body-md">
                                Optimize your professional documents for
                                specific job descriptions in seconds using our
                                matching engine, powered by Gemini.
                            </p>
                        </div>
                        <div className="mt-lg">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.push("/tailor");
                                }}
                                className="bg-surface-container-lowest text-primary px-lg py-md rounded-lg font-label-md text-label-md transition-all hover:bg-white active:scale-95 flex items-center gap-sm cursor-pointer"
                            >
                                Start Tailoring
                                <span className="material-symbols-outlined">
                                    arrow_forward
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Profile Overview (Small) */}
                    <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between transition-all duration-300 hover:border-primary hover:-translate-y-1">
                        <div>
                            <div className="flex items-center gap-md mb-lg">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-container-high bg-primary-container/10 flex items-center justify-center font-bold text-headline-md text-primary">
                                    {user?.displayName
                                        ? user.displayName
                                              .charAt(0)
                                              .toUpperCase()
                                        : "U"}
                                </div>
                                <div>
                                    <h3 className="font-headline-md text-headline-md">
                                        {user ? user.displayName : "My Profile"}
                                    </h3>
                                </div>
                            </div>
                            <div className="space-y-sm mb-lg">
                                <p className="text-body-md font-body-md text-on-surface-variant p-[0.5rem]">
                                    Add or modify your applicant profile to
                                    receive specialized recommendations.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push("/profile")}
                            className="w-full py-sm border border-outline-variant text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all active:scale-95 cursor-pointer font-medium"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Application History (Wide/Bottom) */}
                    <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                        <div className="p-lg flex justify-between items-center border-b border-outline-variant">
                            <div>
                                <h3 className="font-headline-md text-headline-md">
                                    Application History
                                </h3>
                                <p className="text-body-sm font-body-sm text-on-surface-variant">
                                    Track your progress across all your recent
                                    applications.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/history")}
                                className="text-primary font-label-md text-label-md hover:underline cursor-pointer font-medium"
                            >
                                View All
                            </button>
                        </div>  
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-lowest border-t border-outline-variant">
                <div className="flex flex-col md:flex-row justify-between items-center px-lg py-xl max-w-container-max mx-auto w-full gap-md">
                    <div className="flex items-center gap-md">
                        <span className="text-label-md font-label-md text-on-surface-variant">
                            FineTailr
                        </span>
                        <span className="text-label-sm font-label-sm text-on-surface-variant">
                            © FineTailr 2026
                        </span>
                    </div>
                    <nav className="flex gap-lg">
                        <Link
                            className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200"
                            href="/terms"
                        >
                            Terms
                        </Link>
                        <Link
                            className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200"
                            href="/privacy"
                        >
                            Privacy
                        </Link>
                        <Link
                            className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200"
                            href="/contact"
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>

            {/* FAB for quick action (Mobile/Desktop Contextual) */}
            <button
                onClick={() => router.push("/tailor")}
                className="fixed bottom-lg right-lg bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden cursor-pointer"
            >
                <span className="material-symbols-outlined">add</span>
            </button>
        </div>
    );
}
