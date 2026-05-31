"use client";

import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function Home() {
    const { user } = useAuth();

    const getStartedHref = user ? "/dashboard" : "/login";

    return (
        <div className="bg-surface-container-lowest text-on-surface flex flex-col">
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="hero-pattern relative overflow-hidden py-xl md:py-[120px]">
                    <div className="max-w-container-max mx-auto px-lg flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-xs bg-surface-container-high px-md py-1 rounded-full mb-md">
                            <span className="material-symbols-outlined text-[16px] text-primary">
                                auto_awesome
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant">
                                AI-Powered Optimization
                            </span>
                        </div>
                        <h1 className="font-headline-xl text-headline-xl md:text-[64px] md:leading-[72px] text-on-surface max-w-[800px] mb-md">
                            Your resume,{" "}
                            <span className="text-primary">fine-tuned</span> for
                            every job
                        </h1>
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mb-xl">
                            Optimize your resume against job descriptions using
                            AI to land more interviews. Professional, precise,
                            and systematic.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-md items-center">
                            <Link
                                href={getStartedHref}
                                className="bg-primary-container text-on-primary-container px-xl py-md rounded-xl font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm block text-center"
                            >
                                Get Started
                            </Link>
                        </div>
                        {/* Hero Image / Visual Element */}
                        <div className="mt-xl w-full max-w-[1000px] relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent z-10"></div>
                            <img
                                alt="FineTailr Dashboard Preview"
                                className="rounded-xl border border-outline-variant shadow-lg w-full h-auto"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmJVPS8SjiG7n76WUFdmTWleo9ziJJZTKMcjZ1PvTw2KmRM3WttlUUwq1kHIqCJVH9u4Y6qfJMa1sPrfSw2_KhHDzHgsZXy1FPbAkvmRFQUnDaMz_LgAVsY6CDMNYSJlLgqXkRTd6dgCyMFAqSkANSUSxJrHZFkBYtSMkDnFTk8CE9J-4g2G8mdMWZTem7ttYVhdsqmGcCtMA6ssBVNcVJeyBait_2TlosIFBixNxpeFnLmeqjhQ9DMulX1eOX8BTJKfV7mQfMKcHe"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
                <div className="flex justify-between items-center px-lg py-xl max-w-container-max mx-auto w-full">
                    <div className="flex flex-col gap-xs">
                        <span className="text-label-md text-label-md text-on-surface-variant">
                            © FineTailr
                        </span>
                        <span className="text-label-sm text-on-surface-variant/60">
                            Professional Resume Intelligence
                        </span>
                    </div>
                    <div className="flex gap-lg">
                        <Link
                            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200"
                            href="/terms"
                        >
                            Terms
                        </Link>
                        <Link
                            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200"
                            href="/privacy"
                        >
                            Privacy
                        </Link>
                        <Link
                            className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200"
                            href="/contact"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
