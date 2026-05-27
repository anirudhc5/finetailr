"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useAuth();

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-10");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      section.classList.add("transition-all", "duration-700", "opacity-0", "translate-y-10");
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, []);

  const getStartedHref = user ? "/dashboard" : "/login";

  return (
    <div className="bg-surface-container-lowest text-on-surface min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-[72px]">
        {/* Hero Section */}
        <section className="hero-pattern relative overflow-hidden py-xl md:py-[120px]">
          <div className="max-w-container-max mx-auto px-lg flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-xs bg-surface-container-high px-md py-1 rounded-full mb-md">
              <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">AI-Powered Optimization</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl md:text-[64px] md:leading-[72px] text-on-surface max-w-[800px] mb-md">
              Your resume, <span className="text-primary">fine-tuned</span> for every job
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px] mb-xl">
              Optimize your resume against job descriptions using AI to land more interviews. Professional, precise, and systematic.
            </p>
            <div className="flex flex-col sm:flex-row gap-md items-center">
              <Link
                href={getStartedHref}
                className="bg-primary-container text-on-primary-container px-xl py-md rounded-xl font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-sm block text-center"
              >
                Get Started
              </Link>
              <button className="bg-surface-container-lowest border border-outline-variant text-on-surface px-xl py-md rounded-xl font-label-md text-label-md hover:bg-surface-container-low active:scale-95 transition-all cursor-pointer">
                View Demo
              </button>
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

        {/* Features Bento Grid */}
        <section className="py-xl bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-lg">
            <div className="text-center mb-xl">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Professional Grade Analysis</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Built for career growth with precision tools.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-lg h-auto md:h-[500px]">
              {/* Large Feature: ATS Scoring */}
              <div className="md:col-span-2 bg-surface-container-low p-xl rounded-xl border border-outline-variant flex flex-col justify-between group hover:border-primary transition-colors duration-300">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-md">
                    <span className="material-symbols-outlined text-primary text-[32px]">query_stats</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">ATS Scoring</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px]">
                    Get an instant score based on industry-standard Applicant Tracking System algorithms. Know exactly where you stand before hitting submit.
                  </p>
                </div>
                <div className="mt-xl bg-surface-container-lowest p-md rounded-lg border border-outline-variant shadow-sm self-start">
                  <div className="flex items-center gap-md mb-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Match Strength</span>
                    <span className="font-label-md text-label-md text-primary font-bold">85%</span>
                  </div>
                  <div className="w-48 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="w-[85%] h-full bg-primary transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
              {/* Small Feature: Keyword Gap */}
              <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant flex flex-col group hover:border-primary transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-tertiary text-[32px]">search_insights</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Keyword Gap Analysis</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant flex-grow">
                  Identify missing technical and soft skills requested in the job description to bridge the qualification gap instantly.
                </p>
                <div className="flex flex-wrap gap-xs mt-md">
                  <span className="px-xs py-1 bg-surface-container-low border border-outline-variant rounded-lg text-[10px] font-bold text-on-surface-variant uppercase">Missing</span>
                  <span className="px-xs py-1 bg-surface-container-low border border-outline-variant rounded-lg text-[10px] font-bold text-on-surface-variant uppercase">Leadership</span>
                  <span className="px-xs py-1 bg-surface-container-low border border-outline-variant rounded-lg text-[10px] font-bold text-on-surface-variant uppercase">Python</span>
                </div>
              </div>
              {/* Small Feature: AI Rewrites */}
              <div className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant flex flex-col group hover:border-primary transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-md">
                  <span className="material-symbols-outlined text-primary text-[32px]">edit_note</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">AI Bullet Rewrites</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Transform weak descriptions into impact-focused bullets that highlight your achievements with professional terminology.
                </p>
                <div className="mt-md border-l-2 border-primary pl-md py-xs italic text-body-sm text-on-surface-variant">
                  &quot;Led team efforts...&quot; → &quot;Spearheaded cross-functional initiatives...&quot;
                </div>
              </div>
              {/* Small Feature: App History */}
              <div className="md:col-span-2 bg-surface-container-low p-xl rounded-xl border border-outline-variant flex items-center gap-xl group hover:border-primary transition-colors duration-300">
                <div className="flex-grow">
                  <div className="w-12 h-12 rounded-lg bg-on-secondary-container/10 flex items-center justify-center mb-md">
                    <span className="material-symbols-outlined text-on-secondary-container text-[32px]">history</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Application History</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Track every version of your resume tailored for different roles. Keep your job search organized and your data centralized.
                  </p>
                </div>
                <div className="hidden sm:block shrink-0">
                  <div className="space-y-sm">
                    <div className="w-40 h-8 bg-surface-container-lowest rounded-lg border border-outline-variant"></div>
                    <div className="w-40 h-8 bg-surface-container-lowest rounded-lg border border-outline-variant opacity-60"></div>
                    <div className="w-40 h-8 bg-surface-container-lowest rounded-lg border border-outline-variant opacity-30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof / Trust */}
        <section className="py-xl border-t border-outline-variant bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-lg text-center">
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-lg">Trusted by professionals from</p>
            <div className="flex flex-wrap justify-center items-center gap-xl opacity-50 grayscale">
              <span className="font-headline-md text-headline-md">TECHCORP</span>
              <span className="font-headline-md text-headline-md">GLOBAL-IND</span>
              <span className="font-headline-md text-headline-md">INNOVATE-X</span>
              <span className="font-headline-md text-headline-md">SYSTEMIC</span>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-xl bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto px-lg flex flex-col md:flex-row items-center justify-between gap-xl">
            <div className="text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg mb-sm">Ready to land your dream role?</h2>
              <p className="font-body-md text-body-md opacity-90">Start fine-tuning your resume today. Free for your first 3 tailoring sessions.</p>
            </div>
            <Link
              href={getStartedHref}
              className="bg-surface-container-lowest text-primary px-xl py-md rounded-xl font-headline-md text-headline-md hover:bg-surface-container-low transition-all whitespace-nowrap shadow-lg block text-center"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant mt-auto">
        <div className="flex justify-between items-center px-lg py-xl max-w-container-max mx-auto w-full">
          <div className="flex flex-col gap-xs">
            <span className="text-label-md text-label-md text-on-surface-variant">© FineTailr</span>
            <span className="text-label-sm text-on-surface-variant/60">Professional Resume Intelligence</span>
          </div>
          <div className="flex gap-lg">
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200" href="/terms">Terms</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200" href="/privacy">Privacy</Link>
            <Link className="font-label-sm text-label-sm text-on-surface-variant hover:underline transition-opacity duration-200" href="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
