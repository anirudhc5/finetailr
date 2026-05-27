"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Application {
  id: string;
  title: string;
  company: string;
  date: string;
  score: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Static applications list with TODO comments for backend wiring
  // TODO: Fetch applications list from Firestore users/{userId}/applications
  const staticApplications: Application[] = [
    {
      id: "1",
      title: "Senior Product Designer",
      company: "Linear",
      date: "Oct 24, 2023",
      score: 94
    },
    {
      id: "2",
      title: "Frontend Engineer",
      company: "Vercel",
      date: "Oct 18, 2023",
      score: 76
    },
    {
      id: "3",
      title: "Creative Director",
      company: "Stripe",
      date: "Oct 12, 2023",
      score: 42
    },
    {
      id: "4",
      title: "Fullstack Developer",
      company: "Notion Labs Inc.",
      date: "Oct 05, 2023",
      score: 88
    },
    {
      id: "5",
      title: "Growth Manager",
      company: "Intercom",
      date: "Sep 28, 2023",
      score: 65
    }
  ];

  // Client-side search filters the list
  const filteredApplications = staticApplications.filter((app) =>
    app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ATS Score color code styling
  const getBadgeClass = (score: number) => {
    if (score >= 80) {
      return "bg-green-100 text-green-800 border-green-200";
    } else if (score >= 60) {
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else {
      return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getDotClass = (score: number) => {
    if (score >= 80) {
      return "bg-green-500";
    } else if (score >= 60) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl">
      {/* Header Section */}
      <div className="mb-xl">
        <h1 className="font-headline-xl text-headline-xl mb-sm">Application History</h1>
        <p className="text-on-surface-variant font-body-lg">
          Track and manage your tailored resume submissions and ATS performance scores.
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
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded font-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-xs px-md py-sm border border-outline-variant rounded font-label-md text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">sort</span>
            Sort
          </button>
        </div>
      </div>

      {/* History Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {filteredApplications.map((app) => (
          <div
            key={app.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg hover:shadow-sm transition-all hover:-translate-y-1 duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-md">
                <div className="bg-primary-container/10 p-sm rounded-lg">
                  <span className="material-symbols-outlined text-primary">description</span>
                </div>
                <span className={`border text-label-sm font-label-sm px-md py-xs rounded-full flex items-center gap-xs ${getBadgeClass(app.score)}`}>
                  <span className={`w-2 h-2 rounded-full ${getDotClass(app.score)}`}></span>
                  {app.score}% ATS Score
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">{app.title}</h3>
              <p className="text-on-surface-variant font-body-md mb-md">{app.company}</p>
              <div className="flex items-center gap-sm text-outline font-label-sm mb-lg">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                <span>Analyzed on {app.date}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                // TODO: Load specific application detail view
                console.log("Viewing details for application ID:", app.id);
              }}
              className="w-full py-sm bg-white border border-outline-variant rounded font-label-md text-on-surface hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-xs active:scale-[0.98] cursor-pointer"
            >
              View Details
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        ))}

        {/* Empty State / New Analysis Card */}
        <Link
          href="/tailor"
          className="border-2 border-dashed border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary transition-colors duration-300"
        >
          <div className="bg-surface-container p-md rounded-full mb-md group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
            <span className="material-symbols-outlined text-[32px]">add</span>
          </div>
          <h3 className="font-headline-md text-headline-md mb-xs text-on-surface">Analyze New Job</h3>
          <p className="text-on-surface-variant font-body-sm px-md">
            Tailor your resume for another opportunity and track it here.
          </p>
        </Link>
      </div>

      {/* Pagination */}
      <div className="mt-xl flex justify-center items-center gap-md">
        <button
          className="p-sm rounded border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors disabled:opacity-30 cursor-pointer"
          disabled
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <div className="flex gap-xs">
          <button className="w-10 h-10 rounded bg-primary text-on-primary font-label-md">1</button>
          <button className="w-10 h-10 rounded border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md transition-colors cursor-pointer">
            2
          </button>
          <button className="w-10 h-10 rounded border border-outline-variant text-on-surface hover:bg-surface-container-low font-label-md transition-colors cursor-pointer">
            3
          </button>
        </div>
        <button className="p-sm rounded border border-outline-variant text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </main>
  );
}
