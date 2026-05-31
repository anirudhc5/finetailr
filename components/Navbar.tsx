"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { sign_out } from "@/lib/auth";

export default function Navbar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const logoHref = user ? "/dashboard" : "/";

    const getLinkClass = (path: string) => {
        const baseClass =
            "font-body-md text-body-md transition-colors duration-200";
        const isActive = pathname === path;
        return `${baseClass} ${
            isActive
                ? "text-primary font-semibold border-b-2 border-primary pb-1"
                : "text-on-surface-variant hover:text-primary"
        }`;
    };

    const getInitial = () => {
        if (user?.displayName) {
            return user.displayName.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return "U";
    };

    return (
        <header className="bg-surface-container-lowest border-b border-outline-variant fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between items-center px-lg py-md max-w-container-max mx-auto w-full">
                <div className="flex items-center gap-xl">
                    <Link
                        href={logoHref}
                        className="text-headline-md font-headline-md text-primary font-bold"
                    >
                        FineTailr
                    </Link>
                    {user && (
                        <nav className="hidden md:flex gap-lg items-center">
                            <Link
                                className={getLinkClass("/dashboard")}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                            <Link
                                className={getLinkClass("/tailor")}
                                href="/tailor"
                            >
                                Tailor
                            </Link>
                            <Link
                                className={getLinkClass("/history")}
                                href="/history"
                            >
                                History
                            </Link>
                        </nav>
                    )}
                </div>
                <div className="flex items-center gap-md">
                    {user ? (
                        <>
                            {/* Search button (static no-op) */}
                            <button className="text-on-surface-variant hover:text-primary p-xs flex items-center justify-center transition-colors cursor-pointer">
                                <span className="material-symbols-outlined text-[24px]">
                                    search
                                </span>
                            </button>

                            {/* User Avatar Circle */}
                            <Link
                                href="/profile"
                                className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-label-md text-label-md font-semibold select-none hover:opacity-90 transition-opacity"
                            >
                                {getInitial()}
                            </Link>

                            <button
                                onClick={() => sign_out()}
                                className="font-label-md text-label-md px-md py-xs rounded-lg text-on-surface-variant hover:text-primary transition-all cursor-pointer font-medium"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="font-label-md text-label-md px-md py-xs rounded-lg text-on-surface-variant hover:text-primary transition-all font-semibold"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
