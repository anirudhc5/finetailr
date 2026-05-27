"use client";

import { useState } from "react";

export default function TailorPage() {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mocks representing the analysis results (all static placeholders with // TODO)
  const atsScore = 74;
  const matchLabel = "Fair Match";
  const matchedKeywords = ["React", "TypeScript", "System Design"];
  const missingKeywords = ["AWS Lambda", "CI/CD Pipelines", "Redis"];

  const rewrittenBullets = [
    {
      original: "Responsible for building the dashboard using React and managing states.",
      rewritten: "Engineered a high-performance analytics dashboard using React, improving data visualization speed by 40%."
    },
    {
      original: "Fixed bugs in the backend and helped with the database migration.",
      rewritten: "Optimized backend stability by resolving 50+ critical bugs and led a zero-downtime PostgreSQL migration."
    }
  ];

  // SVG parameters
  const radius = 40;
  const circumference = 2 * Math.PI * radius; // ~251.2
  const strokeDashoffset = circumference - (circumference * atsScore) / 100;

  const handleAnalyze = () => {
    // TODO: Connect Firebase backend analysis flow & Gemini API request
    console.log("Analyzing resume for application:", {
      company,
      jobTitle,
      descriptionLength: jobDescription.length
    });
  };

  const handleSave = () => {
    // TODO: Connect Firestore storage call to save tailoring application
    console.log("Saving tailored application record to Firestore...");
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
    <main className="max-w-container-max mx-auto px-lg py-xl">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-xl">
        {/* Left Column: Input Form */}
        <section className="lg:col-span-5 space-y-lg">
          <div className="space-y-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface">Tailor Application</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Optimize your resume for a specific job description in seconds.
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
                  placeholder="e.g. Stripe"
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
                  placeholder="e.g. Senior Frontend Engineer"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
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
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              onClick={handleAnalyze}
              className="w-full py-md bg-primary-container text-on-primary font-bold rounded-lg hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-sm cursor-pointer"
            >
              <span className="material-symbols-outlined">analytics</span>
              Analyze My Resume
            </button>
          </div>
        </section>

        {/* Right Column: Results Area */}
        <section className="lg:col-span-7 space-y-lg">
          {/* Score & Keywords Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {/* ATS Score Card */}
            <div className="md:col-span-1 bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col items-center justify-center text-center shadow-soft">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-md block">
                ATS Score
              </span>
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    className="text-surface-container"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                  ></circle>
                  <circle
                    className="text-primary transition-all duration-1000"
                    cx="48"
                    cy="48"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth="8"
                  ></circle>
                </svg>
                <span className="absolute font-headline-lg text-headline-lg">{atsScore}</span>
              </div>
              <p className="mt-md font-label-md text-label-md text-on-surface-variant">{matchLabel}</p>
            </div>

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
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> {kw}
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
                        <span className="material-symbols-outlined text-[16px]">add_circle</span> {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Bullet Rewrites */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden shadow-soft">
            <div className="px-lg py-md border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
              <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">
                Suggested Bullet Rewrites
              </h3>
              <span className="text-label-sm text-primary flex items-center gap-xs font-semibold">
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span> AI-Powered
              </span>
            </div>
            <div className="divide-y divide-outline-variant">
              {rewrittenBullets.map((item, index) => (
                <div key={index} className="p-lg grid grid-cols-1 md:grid-cols-2 gap-lg bg-white">
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
                      <span className="font-label-sm text-label-sm text-primary font-semibold">Rewritten</span>
                      <button
                        onClick={() => copyToClipboard(item.rewritten, index)}
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
              <span className="material-symbols-outlined">save</span>
              Save Application
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
