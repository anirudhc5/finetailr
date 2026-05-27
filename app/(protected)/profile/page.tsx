"use client";

import { useState } from "react";

interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  bullets: string;
}

interface Project {
  name: string;
  description: string;
}

export default function ProfilePage() {
  // Sidebar active shortcut selection state
  const [activeSection, setActiveSection] = useState("basic-info");

  // Basic Info Form States
  const [name, setName] = useState("Alex Rivera");
  const [email, setEmail] = useState("alex.rivera@example.com");
  const [university, setUniversity] = useState("Stanford University");
  const [gpa, setGpa] = useState("3.9 / 4.0");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/alexrivera");
  const [portfolioUrl, setPortfolioUrl] = useState("https://github.com/alexrivera");

  // Skill tag list states
  const [skills, setSkills] = useState<string[]>([
    "TypeScript",
    "React.js",
    "Python",
    "Tailwind CSS"
  ]);
  const [skillInput, setSkillInput] = useState("");

  // Repeatable Experience arrays
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      company: "Google",
      role: "Software Engineering Intern",
      startDate: "2023-05",
      endDate: "2023-08",
      bullets: "Developed a new feature for the internal dashboard using React."
    }
  ]);

  // Repeatable Projects arrays
  const [projects, setProjects] = useState<Project[]>([
    {
      name: "Personal Resume Builder",
      description: "Built using Next.js and Tailwind CSS to format bullet points."
    }
  ]);

  // Other section states
  const [degree, setDegree] = useState("B.S. in Computer Science");
  const [gradYear, setGradYear] = useState("2025");
  const [extracurriculars, setExtracurriculars] = useState(
    "• President of Coding Club\n• Volunteer at Local Food Bank"
  );
  const [languages, setLanguages] = useState<string[]>([
    "English (Native)",
    "Mandarin (Fluent)"
  ]);
  const [langInput, setLangInput] = useState("");
  const [showAddLang, setShowAddLang] = useState(false);

  // Save State Animation
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.offsetTop - 100;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  // Add skill on Enter or Comma
  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleanSkill = skillInput.trim().replace(/,$/, "");
      if (cleanSkill && !skills.includes(cleanSkill)) {
        setSkills([...skills, cleanSkill]);
      }
      setSkillInput("");
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  // repeatable experiences methods
  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        bullets: ""
      }
    ]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = experiences.map((exp, idx) => {
      if (idx === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setExperiences(updated);
  };

  const removeExperience = (indexToRemove: number) => {
    setExperiences(experiences.filter((_, idx) => idx !== indexToRemove));
  };

  // repeatable projects methods
  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        description: ""
      }
    ]);
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = projects.map((proj, idx) => {
      if (idx === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setProjects(updated);
  };

  const removeProject = (indexToRemove: number) => {
    setProjects(projects.filter((_, idx) => idx !== indexToRemove));
  };

  // Add Language
  const addLanguage = () => {
    const cleanLang = langInput.trim();
    if (cleanLang && !languages.includes(cleanLang)) {
      setLanguages([...languages, cleanLang]);
      setLangInput("");
      setShowAddLang(false);
    }
  };

  const removeLanguage = (indexToRemove: number) => {
    setLanguages(languages.filter((_, idx) => idx !== indexToRemove));
  };

  // Simulate Save
  const handleSaveProfile = () => {
    setSaveStatus("saving");
    // TODO: Connect Firestore document write to users/{userId}
    console.log("Saving profile changes to Firestore database...", {
      basicInfo: { name, email, university, gpa, linkedinUrl, portfolioUrl },
      skills,
      experiences,
      projects,
      education: { degree, gradYear },
      extracurriculars,
      languages
    });

    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    }, 1000);
  };

  return (
    <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
        {/* Side Navigation (Internal Section Shortcuts) */}
        <aside className="hidden md:block md:col-span-3">
          <div className="sticky top-24 space-y-md">
            <h3 className="font-headline-md text-headline-md mb-md">Profile Builder</h3>
            <nav className="space-y-xs">
              <button
                onClick={() => scrollToSection("basic-info")}
                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                  activeSection === "basic-info"
                    ? "bg-surface-container-high text-primary font-bold border-primary"
                    : "text-on-surface-variant hover:bg-surface-container border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
                <span className="font-label-md text-label-md">Basic Info</span>
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                  activeSection === "skills"
                    ? "bg-surface-container-high text-primary font-bold border-primary"
                    : "text-on-surface-variant hover:bg-surface-container border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
                <span className="font-label-md text-label-md">Skills</span>
              </button>
              <button
                onClick={() => scrollToSection("work-experience")}
                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                  activeSection === "work-experience"
                    ? "bg-surface-container-high text-primary font-bold border-primary"
                    : "text-on-surface-variant hover:bg-surface-container border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">work</span>
                <span className="font-label-md text-label-md">Work Experience</span>
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                  activeSection === "projects"
                    ? "bg-surface-container-high text-primary font-bold border-primary"
                    : "text-on-surface-variant hover:bg-surface-container border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">code</span>
                <span className="font-label-md text-label-md">Projects</span>
              </button>
              <button
                onClick={() => scrollToSection("education-others")}
                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                  activeSection === "education-others"
                    ? "bg-surface-container-high text-primary font-bold border-primary"
                    : "text-on-surface-variant hover:bg-surface-container border-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span className="font-label-md text-label-md">Education &amp; More</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="md:col-span-9 space-y-xl pb-24">
          {/* Basic Info Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg" id="basic-info">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant font-bold text-headline-md text-primary select-none">
                {name ? name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg">Basic Information</h2>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Your identity and key contact details.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Full Name</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="John Doe"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Email Address</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="john.doe@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">Current University</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="Stanford University"
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant">GPA</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="3.9 / 4.0"
                  type="text"
                  value={gpa}
                  onChange={(e) => setGpa(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs sm:col-span-2">
                <label className="font-label-md text-label-md text-on-surface-variant">LinkedIn URL</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="https://linkedin.com/in/johndoe"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs sm:col-span-2">
                <label className="font-label-md text-label-md text-on-surface-variant">Portfolio / GitHub</label>
                <input
                  className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                  placeholder="https://github.com/johndoe"
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg" id="skills">
            <h2 className="font-headline-lg text-headline-lg mb-xs">Skills</h2>
            <p className="text-on-surface-variant font-body-sm text-body-sm mb-lg">
              Add relevant tools, frameworks, and hard skills.
            </p>
            <div className="space-y-md">
              <div className="flex flex-wrap gap-sm p-sm border border-outline-variant rounded bg-surface-container-low min-h-[100px] items-center">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-xs px-md py-xs bg-surface-container-highest text-on-surface-variant rounded-full text-label-sm font-label-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="material-symbols-outlined text-[14px] hover:text-error cursor-pointer"
                    >
                      close
                    </button>
                  </span>
                ))}
                <input
                  className="bg-transparent border-none focus:ring-0 p-xs font-body-sm text-body-sm flex-grow min-w-[120px] outline-none"
                  placeholder="Add a skill..."
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                />
              </div>
              <p className="text-label-sm font-label-sm text-outline">Press Enter or comma to add a skill.</p>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg" id="work-experience">
            <div className="flex justify-between items-center mb-lg">
              <div>
                <h2 className="font-headline-lg text-headline-lg">Work Experience</h2>
                <p className="text-on-surface-variant font-body-sm text-body-sm">Detail your professional journey.</p>
              </div>
              <button
                type="button"
                onClick={addExperience}
                className="flex items-center gap-xs text-primary font-label-md text-label-md hover:underline cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">add</span> Add Experience
              </button>
            </div>
            <div className="space-y-lg">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-lg border border-outline-variant rounded-lg relative bg-white space-y-md">
                  <button
                    type="button"
                    onClick={() => removeExperience(idx)}
                    className="absolute top-md right-md text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    title="Remove experience entry"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-sm">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Job Title</label>
                      <input
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                        type="text"
                        value={exp.role}
                        onChange={(e) => updateExperience(idx, "role", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Company</label>
                      <input
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(idx, "company", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Start Date</label>
                      <input
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(idx, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">End Date</label>
                      <input
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(idx, "endDate", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-xs sm:col-span-2">
                      <label className="font-label-md text-label-md text-on-surface-variant">
                        Responsibilities &amp; Achievements
                      </label>
                      <textarea
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                        placeholder="• Developed a new feature for the internal dashboard..."
                        rows={4}
                        value={exp.bullets}
                        onChange={(e) => updateExperience(idx, "bullets", e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg" id="projects">
            <div className="flex justify-between items-center mb-lg">
              <div>
                <h2 className="font-headline-lg text-headline-lg">Projects</h2>
                <p className="text-on-surface-variant font-body-sm text-body-sm">
                  Highlight your personal or academic work.
                </p>
              </div>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center gap-xs text-primary font-label-md text-label-md hover:underline cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[20px]">add</span> Add Project
              </button>
            </div>
            <div className="space-y-lg">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-lg border border-outline-variant rounded-lg bg-white relative space-y-md">
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    className="absolute top-md right-md text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                    title="Remove project entry"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                  <div className="grid grid-cols-1 gap-md pt-sm">
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Project Name</label>
                      <input
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                        placeholder="e.g. Personal Resume Builder"
                        type="text"
                        value={proj.name}
                        onChange={(e) => updateProject(idx, "name", e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-label-md text-label-md text-on-surface-variant">Key Features</label>
                      <textarea
                        className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                        placeholder="• Built using Next.js and Tailwind..."
                        rows={3}
                        value={proj.description}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Others Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg" id="education-others">
            {/* Education */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-headline-md text-headline-md mb-md">Education</h2>
              <div className="space-y-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Degree &amp; Major</label>
                  <input
                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-sm text-body-sm form-input-focus"
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-sm text-label-sm text-on-surface-variant uppercase">Graduation Year</label>
                  <input
                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-sm text-body-sm form-input-focus"
                    type="text"
                    value={gradYear}
                    onChange={(e) => setGradYear(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-headline-md text-headline-md mb-md">Languages</h2>
              <div className="space-y-md">
                {languages.map((lang, index) => (
                  <div key={index} className="flex items-center gap-sm">
                    <span className="bg-surface-container-high px-md py-xs rounded text-label-md font-label-md flex-grow">
                      {lang}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(index)}
                      className="material-symbols-outlined text-outline hover:text-error cursor-pointer"
                      title="Remove language"
                    >
                      close
                    </button>
                  </div>
                ))}

                {showAddLang ? (
                  <div className="flex gap-sm">
                    <input
                      className="bg-surface-container-lowest border border-outline-variant rounded p-xs text-on-surface font-body-sm text-body-sm flex-grow outline-none form-input-focus"
                      placeholder="e.g. Spanish (Conversational)"
                      type="text"
                      value={langInput}
                      onChange={(e) => setLangInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addLanguage();
                      }}
                    />
                    <button
                      type="button"
                      onClick={addLanguage}
                      className="px-sm py-1 bg-primary text-on-primary rounded font-label-sm text-label-sm cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddLang(true)}
                    className="text-primary font-label-sm text-label-sm flex items-center gap-xs cursor-pointer font-semibold"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span> Add Language
                  </button>
                )}
              </div>
            </div>

            {/* Extracurriculars */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
              <h2 className="font-headline-md text-headline-md mb-md">Extracurricular Activities</h2>
              <textarea
                className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                placeholder="• President of Coding Club • Volunteer at Local Food Bank..."
                rows={3}
                value={extracurriculars}
                onChange={(e) => setExtracurriculars(e.target.value)}
              ></textarea>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Save Profile Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant py-md px-lg z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <div className="max-w-container-max mx-auto w-full flex justify-end gap-md items-center">
          <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:block">
            Last saved 2 minutes ago
          </span>
          <button
            onClick={handleSaveProfile}
            className="px-xl py-md bg-primary text-on-primary font-label-md text-label-md rounded shadow-sm hover:bg-surface-tint active:scale-95 transition-all flex items-center gap-sm cursor-pointer font-semibold"
          >
            {saveStatus === "saving" && (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                Saving...
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                Saved!
              </>
            )}
            {saveStatus === "idle" && (
              <>
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Profile
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
