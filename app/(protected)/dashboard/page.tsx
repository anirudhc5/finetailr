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
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl">
        {/* Welcome Header */}
        <section className="mb-xl">
          <h1 className="font-headline-xl text-headline-xl mb-xs">
            Welcome back, {user?.displayName || "Developer"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Your career progress is looking sharp. You have 3 pending applications and 2 new job matches.
          </p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
          {/* Hero Card: Tailor My Resume (Large) */}
          <div 
            onClick={() => router.push("/tailor")}
            className="md:col-span-8 group relative overflow-hidden bg-primary-container rounded-xl p-xl flex flex-col justify-between min-h-[360px] border border-primary transition-all duration-300 hover:shadow-lg cursor-pointer hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 p-lg opacity-20 pointer-events-none">
              <span className="material-symbols-outlined text-[120px]">auto_fix_high</span>
            </div>
            <div>
              <span className="inline-block px-sm py-xs bg-surface-container-lowest text-primary text-label-sm font-label-sm rounded-lg mb-md">
                AI-Powered
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary-container mb-md">
                Tailor My Resume
              </h2>
              <p className="text-on-primary-container opacity-90 font-body-md text-body-md max-w-md">
                Optimize your professional documents for specific job descriptions in seconds using our advanced matching engine.
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
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Profile Overview (Small) */}
          <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between transition-all duration-300 hover:border-primary hover:-translate-y-1">
            <div>
              <div className="flex items-center gap-md mb-lg">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-surface-container-high bg-primary-container/10 flex items-center justify-center font-bold text-headline-md text-primary">
                  {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md">My Profile</h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Profile Strength: 85%</p>
                </div>
              </div>
              <div className="space-y-sm mb-lg">
                <div className="h-1.5 w-full bg-surface-container rounded-full">
                  <div className="h-full bg-primary w-[85%] rounded-full"></div>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Add a portfolio link to reach 100%.</p>
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
                <h3 className="font-headline-md text-headline-md">Application History</h3>
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Track your progress across 12 recent applications.
                </p>
              </div>
              <button 
                onClick={() => router.push("/history")}
                className="text-primary font-label-md text-label-md hover:underline cursor-pointer font-medium"
              >
                View All
              </button>
            </div>
            <div className="divide-y divide-outline-variant">
              {/* TODO: Integrate Firebase Application History fetch */}
              <div className="p-lg flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">business</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md">Senior Product Designer</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">TechFlow Inc. • Applied 2 days ago</p>
                  </div>
                </div>
                <span className="px-sm py-xs bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm rounded-lg font-semibold">
                  Interviewing
                </span>
              </div>
              
              <div className="p-lg flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">corporate_fare</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md">Creative Lead</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Studio Minimal • Applied 1 week ago</p>
                  </div>
                </div>
                <span className="px-sm py-xs bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-lg font-semibold">
                  Under Review
                </span>
              </div>

              <div className="p-lg flex items-center justify-between hover:bg-surface-container-low transition-colors">
                <div className="flex items-center gap-md">
                  <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">apartment</span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md">UX Strategist</p>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">Vanguard Solutions • Applied 2 weeks ago</p>
                  </div>
                </div>
                <span className="px-sm py-xs bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm rounded-lg font-semibold">
                  Under Review
                </span>
              </div>
            </div>
          </div>

          {/* Stats/Insights (Secondary Cards) */}
          {/* TODO: Replace stats widgets with live user data aggregation */}
          <div className="md:col-span-4 bg-surface-container rounded-xl p-lg flex flex-col gap-md transition-all hover:shadow-sm hover:-translate-y-1 duration-200">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary p-sm bg-surface-container-lowest rounded-lg">visibility</span>
              <span className="text-primary font-bold text-headline-md">+12%</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md">Resume Views</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Employers viewed your profile 24 times this week.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container rounded-xl p-lg flex flex-col gap-md transition-all hover:shadow-sm hover:-translate-y-1 duration-200">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-tertiary p-sm bg-surface-container-lowest rounded-lg">star</span>
              <span className="text-tertiary font-bold text-headline-md">High</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md">Match Quality</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">Your tailored resumes average an 88% ATS score.</p>
            </div>
          </div>

          <div className="md:col-span-4 bg-surface-container rounded-xl p-lg flex flex-col gap-md transition-all hover:shadow-sm hover:-translate-y-1 duration-200">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-primary p-sm bg-surface-container-lowest rounded-lg">notifications_active</span>
              <span className="text-primary font-bold text-headline-md">02</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md">New Alerts</h4>
              <p className="text-body-sm font-body-sm text-on-surface-variant">New job matching your &apos;Senior Designer&apos; search.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant">
        <div className="flex flex-col md:flex-row justify-between items-center px-lg py-xl max-w-container-max mx-auto w-full gap-md">
          <div className="flex items-center gap-md">
            <span className="text-label-md font-label-md text-on-surface-variant">FineTailr</span>
            <span className="text-label-sm font-label-sm text-on-surface-variant">© FineTailr</span>
          </div>
          <nav className="flex gap-lg">
            <Link className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200" href="/terms">Terms</Link>
            <Link className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200" href="/privacy">Privacy</Link>
            <Link className="text-on-surface-variant font-label-sm text-label-sm hover:underline transition-opacity duration-200" href="/contact">Contact</Link>
          </nav>
        </div>
      </footer>

      {/* FAB for quick action (Mobile/Desktop Contextual) */}
      <button 
        onClick={() => router.push("/tailor")}
        className="fixed bottom-lg right-lg bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden cursor-pointer"
      >
        <span className="material-symbols-outlined">add</span>
        <span className="max-w-0 group-hover:max-w-xs group-hover:ml-xs transition-all duration-300 font-label-md text-label-md whitespace-nowrap overflow-hidden">
          New Resume
        </span>
      </button>
    </div>
  );
}
