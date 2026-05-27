"use client";

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col justify-center items-center overflow-hidden relative">
      {/* Abstract Atmospheric Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-[80px]"
          style={{
            transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
            transition: "transform 0.1s ease-out"
          }}
        ></div>
        <div 
          className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-tertiary/5 rounded-full blur-[100px]"
          style={{
            transform: `translate(${-mousePos.x * 1.5}px, ${-mousePos.y * 1.5}px)`,
            transition: "transform 0.1s ease-out"
          }}
        ></div>
      </div>

      <main className="relative w-full max-w-container-max px-lg flex items-center justify-center min-h-screen">
        {/* Centered Login Card */}
        <div className="w-full max-w-[420px] bg-surface-container-lowest border border-outline-variant p-xl rounded-lg shadow-sm">
          {/* Branding Section */}
          <div className="flex flex-col items-center mb-xl text-center">
            <div className="mb-lg inline-flex items-center justify-center w-14 h-14 bg-primary-container text-on-primary-container rounded-lg">
              <span className="material-symbols-outlined !text-[32px]">architecture</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mb-xs">
              FineTailr
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Precision resume engineering.
            </p>
          </div>

          {/* Action Section */}
          <div className="space-y-lg">
            <button 
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-md py-md px-lg bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container transition-all duration-200 active:scale-95 google-btn-shadow cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Footer Compliance (Integrated) */}
          <div className="mt-xl pt-lg border-t border-outline-variant flex flex-col gap-sm">
            <div className="flex justify-center gap-lg">
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="/terms">Terms</Link>
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="/privacy">Privacy</Link>
              <Link className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary" href="/help">Help</Link>
            </div>
            <p className="text-center font-label-sm text-label-sm text-on-surface-variant/60">
              © FineTailr 2024
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}