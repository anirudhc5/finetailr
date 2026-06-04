"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Experience, Project, Education } from "@/app/types";

export default function ProfilePage() {
    // Sidebar active shortcut selection state
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState("basic-info");

    // Basic Info Form States
    const [name, setName] = useState(
        user ? (user.displayName ? user.displayName : "") : "",
    );
    const [email, setEmail] = useState(
        user ? (user.email ? user.email : "") : "",
    );
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");

    const [skills, setSkills] = useState<string[]>([
        "TypeScript",
        "React.js",
        "Python",
        "Tailwind CSS",
    ]);
    const [skillInput, setSkillInput] = useState("");

    const [experiences, setExperiences] = useState<Experience[]>([
        {
            company: "Google",
            role: "Software Engineering Intern",
            startDate: "2023-05",
            endDate: "2023-08",
            description:
                "Developed a new feature for the internal dashboard using React.",
        },
    ]);

    // Repeatable Projects arrays
    const [projects, setProjects] = useState<Project[]>([
        {
            name: "Personal Resume Builder",
            description:
                "Built using Next.js and Tailwind CSS to format bullet points.",
        },
    ]);

    const [education, setEducation] = useState<Education[]>([
        {
            univ: "University of Maryland",
            degree: "Bachelor's Degree",
            field: "Computer Science",
            endDate: "2028-05",
        },
    ]);

    const [extracurriculars, setExtracurriculars] = useState("");
    const [languages, setLanguages] = useState<string[]>([
        "English (Native)",
        "Mandarin (Fluent)",
    ]);
    const [langInput, setLangInput] = useState("");
    const [showAddLang, setShowAddLang] = useState(false);

    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
        "idle",
    );

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const topOffset = element.offsetTop - 100;
            window.scrollTo({
                top: topOffset,
                behavior: "smooth",
            });
        }
    };

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

    const addExperience = () => {
        setExperiences([
            ...experiences,
            {
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                description: "",
            },
        ]);
    };

    const addEducation = () => {
        setEducation([
            ...education,
            {
                univ: "",
                degree: "",
                field: "",
                endDate: "",
            },
        ]);
    };

    const updateEducation = (
        index: number,
        field: keyof Education,
        value: string,
    ) => {
        const updated = education.map((edu, idx) => {
            if (idx === index) {
                return { ...edu, [field]: value };
            }
            return edu;
        });
        setEducation(updated);
        console.log(updated);
    };

    const removeEducation = (idx: number) => {
        setEducation(education.filter((_, i) => i !== idx));
    };

    const updateExperience = (
        index: number,
        field: keyof Experience,
        value: string,
    ) => {
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

    const addProject = () => {
        setProjects([
            ...projects,
            {
                name: "",
                description: "",
            },
        ]);
    };

    const updateProject = (
        index: number,
        field: keyof Project,
        value: string,
    ) => {
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
    const handleSaveProfile = async () => {
        if (!user) return;
        setSaveStatus("saving");
        try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name,
                email,
                linkedinUrl,
                portfolioUrl,
                experiences,
                projects,
                education,
                skills,
                extracurriculars,
                languages,
            });
            setSaveStatus("saved");
            setTimeout(() => setSaveStatus("idle"), 2000);
        } catch (e) {
            console.log("Save error.", e);
            setSaveStatus("idle");
        }
    };

    useEffect(() => {
        const loadProfile = async () => {
            if (!user) return;
            const userRef = doc(db, "users", user.uid);
            const snapshot = await getDoc(userRef);
            if (snapshot.exists()) {
                const data = snapshot.data();
                setName(data.name ?? "");
                setEmail(data.email ?? "");
                setLinkedinUrl(data.linkedinUrl ?? "");
                setPortfolioUrl(data.portfolioUrl ?? "");
                setSkills(data.skills ?? []);
                setExperiences(data.experiences ?? []);
                setProjects(data.projects ?? []);
                setEducation(data.education ?? []);
                setExtracurriculars(data.extracurriculars ?? "");
                setLanguages(data.languages ?? []);
            }
        };
        loadProfile();
    }, [user]);

    return (
        <main className="flex-grow max-w-container-max mx-auto w-full px-lg py-xl pt-[7rem]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-xl">
                {/* Side Navigation (Internal Section Shortcuts) */}
                <aside className="hidden md:block md:col-span-3">
                    <div className="sticky top-24 space-y-md">
                        <h3 className="font-headline-md text-headline-md mb-md">
                            Profile Builder
                        </h3>
                        <nav className="space-y-xs">
                            <button
                                onClick={() => scrollToSection("basic-info")}
                                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                                    activeSection === "basic-info"
                                        ? "bg-surface-container-high text-primary font-bold border-primary"
                                        : "text-on-surface-variant hover:bg-surface-container border-transparent"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    person
                                </span>
                                <span className="font-label-md text-label-md">
                                    Basic Info
                                </span>
                            </button>
                            <button
                                onClick={() => scrollToSection("skills")}
                                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                                    activeSection === "skills"
                                        ? "bg-surface-container-high text-primary font-bold border-primary"
                                        : "text-on-surface-variant hover:bg-surface-container border-transparent"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    terminal
                                </span>
                                <span className="font-label-md text-label-md">
                                    Skills
                                </span>
                            </button>
                            <button
                                onClick={() =>
                                    scrollToSection("work-experience")
                                }
                                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                                    activeSection === "work-experience"
                                        ? "bg-surface-container-high text-primary font-bold border-primary"
                                        : "text-on-surface-variant hover:bg-surface-container border-transparent"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    work
                                </span>
                                <span className="font-label-md text-label-md">
                                    Work Experience
                                </span>
                            </button>
                            <button
                                onClick={() => scrollToSection("projects")}
                                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                                    activeSection === "projects"
                                        ? "bg-surface-container-high text-primary font-bold border-primary"
                                        : "text-on-surface-variant hover:bg-surface-container border-transparent"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    code
                                </span>
                                <span className="font-label-md text-label-md">
                                    Projects
                                </span>
                            </button>
                            <button
                                onClick={() =>
                                    scrollToSection("education-others")
                                }
                                className={`w-full flex items-center gap-sm p-sm rounded-lg transition-all border-l-2 text-left cursor-pointer ${
                                    activeSection === "education-others"
                                        ? "bg-surface-container-high text-primary font-bold border-primary"
                                        : "text-on-surface-variant hover:bg-surface-container border-transparent"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    school
                                </span>
                                <span className="font-label-md text-label-md">
                                    Education &amp; More
                                </span>
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="md:col-span-9 space-y-xl pb-24">
                    {/* Basic Info Section */}
                    <section
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
                        id="basic-info"
                    >
                        <div className="flex items-center gap-md mb-lg">
                            <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant font-bold text-headline-md text-primary select-none">
                                {name ? name.charAt(0).toUpperCase() : "U"}
                            </div>
                            <div>
                                <h2 className="font-headline-lg text-headline-lg">
                                    Basic Information
                                </h2>
                                <p className="text-on-surface-variant font-body-sm text-body-sm">
                                    Your identity and key contact details.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Full Name
                                </label>
                                <input
                                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                    placeholder="John Doe"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-xs">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Email Address
                                </label>
                                <input
                                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                    placeholder="john.doe@example.com"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-xs sm:col-span-2">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    LinkedIn URL
                                </label>
                                <input
                                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                    placeholder="https://linkedin.com/in/johndoe"
                                    type="url"
                                    value={linkedinUrl}
                                    onChange={(e) =>
                                        setLinkedinUrl(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-xs sm:col-span-2">
                                <label className="font-label-md text-label-md text-on-surface-variant">
                                    Portfolio / GitHub
                                </label>
                                <input
                                    className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                    placeholder="https://github.com/johndoe"
                                    type="url"
                                    value={portfolioUrl}
                                    onChange={(e) =>
                                        setPortfolioUrl(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
                        id="skills"
                    >
                        <h2 className="font-headline-lg text-headline-lg mb-xs">
                            Skills
                        </h2>
                        <p className="text-on-surface-variant font-body-sm text-body-sm mb-lg">
                            Add relevant tools, frameworks, and other skills.
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
                                    onChange={(e) =>
                                        setSkillInput(e.target.value)
                                    }
                                    onKeyDown={handleSkillKeyDown}
                                />
                            </div>
                            <p className="text-label-sm font-label-sm text-outline">
                                Press Enter or comma to add a skill.
                            </p>
                        </div>
                    </section>

                    {/* Work Experience Section */}
                    <section
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
                        id="work-experience"
                    >
                        <div className="flex justify-between items-center mb-lg">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg">
                                    Work Experience
                                </h2>
                                <p className="text-on-surface-variant font-body-sm text-body-sm">
                                    Detail your professional journey.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addExperience}
                                className="flex items-center gap-xs text-primary font-label-md text-label-md hover:underline cursor-pointer font-semibold"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    add
                                </span>{" "}
                                Add Experience
                            </button>
                        </div>
                        <div className="space-y-lg">
                            {experiences.map((exp, idx) => (
                                <div
                                    key={idx}
                                    className="p-lg border border-outline-variant rounded-lg relative bg-white space-y-md"
                                >
                                    <button
                                        type="button"
                                        onClick={() => removeExperience(idx)}
                                        className="absolute top-md right-md text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                                        title="Remove experience entry"
                                    >
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-sm">
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Job Title
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="text"
                                                value={exp.role}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        idx,
                                                        "role",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Company
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="text"
                                                value={exp.company}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        idx,
                                                        "company",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Start Date
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="month"
                                                value={exp.startDate}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        idx,
                                                        "startDate",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                End Date
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="month"
                                                value={exp.endDate}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        idx,
                                                        "endDate",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs sm:col-span-2">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Job Description
                                            </label>
                                            <textarea
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                                                placeholder="• Developed a new feature for the internal dashboard..."
                                                rows={4}
                                                value={exp.description}
                                                onChange={(e) =>
                                                    updateExperience(
                                                        idx,
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
                        id="projects"
                    >
                        <div className="flex justify-between items-center mb-lg">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg">
                                    Projects
                                </h2>
                                <p className="text-on-surface-variant font-body-sm text-body-sm">
                                    Highlight your personal or academic work.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addProject}
                                className="flex items-center gap-xs text-primary font-label-md text-label-md hover:underline cursor-pointer font-semibold"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    add
                                </span>{" "}
                                Add Project
                            </button>
                        </div>
                        <div className="space-y-lg">
                            {projects.map((proj, idx) => (
                                <div
                                    key={idx}
                                    className="p-lg border border-outline-variant rounded-lg bg-white relative space-y-md"
                                >
                                    <button
                                        type="button"
                                        onClick={() => removeProject(idx)}
                                        className="absolute top-md right-md text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                                        title="Remove project entry"
                                    >
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                    <div className="grid grid-cols-1 gap-md pt-sm">
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Project Name
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                placeholder="e.g. Personal Resume Builder"
                                                type="text"
                                                value={proj.name}
                                                onChange={(e) =>
                                                    updateProject(
                                                        idx,
                                                        "name",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Project Description
                                            </label>
                                            <textarea
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                                                placeholder="• Built using Next.js and Tailwind..."
                                                rows={3}
                                                value={proj.description}
                                                onChange={(e) =>
                                                    updateProject(
                                                        idx,
                                                        "description",
                                                        e.target.value,
                                                    )
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section
                        className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
                        id="education-others"
                    >
                        <div className="flex justify-between items-center mb-lg">
                            <div>
                                <h2 className="font-headline-lg text-headline-lg">
                                    Education
                                </h2>
                                <p className="text-on-surface-variant font-body-sm text-body-sm">
                                    Build your credibility with education.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={addEducation}
                                className="flex items-center gap-xs text-primary font-label-md text-label-md hover:underline cursor-pointer font-semibold"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    add
                                </span>{" "}
                                Add Education
                            </button>
                        </div>
                        <div className="space-y-lg">
                            {education.map((edu, idx) => (
                                <div
                                    key={idx}
                                    className="p-lg border border-outline-variant rounded-lg bg-white relative space-y-md"
                                >
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(idx)}
                                        className="absolute top-md right-md text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                                        title="Remove project entry"
                                    >
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </button>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-md pt-sm">
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                University Name
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="text"
                                                value={edu.univ ?? ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        idx,
                                                        "univ",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                GPA
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="text"
                                                value={edu.gpa ?? ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        idx,
                                                        "gpa",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Start Date
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="month"
                                                value={edu.startDate ?? ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        idx,
                                                        "startDate",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                End Date
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="month"
                                                value={edu.endDate ?? ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        idx,
                                                        "endDate",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Degree
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus pr-10"
                                                    value={edu.degree ?? ""}
                                                    onChange={(e) =>
                                                        updateEducation(
                                                            idx,
                                                            "degree",
                                                            e.target.value,
                                                        )
                                                    }
                                                >
                                                    <option value="" disabled>
                                                        Select a degree
                                                    </option>
                                                    <option value="High School Diploma">
                                                        High School Diploma
                                                    </option>
                                                    <option value="Associate's">
                                                        Associate&apos;s
                                                    </option>
                                                    <option value="Bachelor's">
                                                        Bachelor&apos;s
                                                    </option>
                                                    <option value="Master's">
                                                        Master&apos;s
                                                    </option>
                                                    <option value="MBA">
                                                        MBA
                                                    </option>
                                                    <option value="PhD">
                                                        PhD
                                                    </option>
                                                    <option value="JD">
                                                        JD
                                                    </option>
                                                    <option value="Other">
                                                        Other
                                                    </option>
                                                </select>
                                                {/* Custom chevron icon */}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-sm">
                                                    <svg
                                                        className="w-4 h-4 text-on-surface-variant"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-xs">
                                            <label className="font-label-md text-label-md text-on-surface-variant">
                                                Field
                                            </label>
                                            <input
                                                className="bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus"
                                                type="text"
                                                value={edu.field ?? ""}
                                                onChange={(e) =>
                                                    updateEducation(
                                                        idx,
                                                        "field",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Others Section */}
                    <section className="grid grid-cols-1 gap-lg" id="others">
                        {/* Languages */}
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                            <h2 className="font-headline-md text-headline-md mb-md">
                                Languages
                            </h2>
                            <div className="space-y-md">
                                {languages.map((lang, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-sm"
                                    >
                                        <span className="bg-surface-container-high px-md py-md rounded text-label-md font-label-md flex-grow">
                                            {lang}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeLanguage(index)
                                            }
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
                                            onChange={(e) =>
                                                setLangInput(e.target.value)
                                            }
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter")
                                                    addLanguage();
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
                                        <span className="material-symbols-outlined text-[16px]">
                                            add
                                        </span>{" "}
                                        Add Language
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Extracurriculars */}
                        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
                            <h2 className="font-headline-md text-headline-md mb-md">
                                Extracurricular Activities
                            </h2>
                            <textarea
                                className="w-full bg-surface-container-lowest border border-outline-variant rounded p-sm text-on-surface font-body-md text-body-md form-input-focus resize-none"
                                placeholder="Enter extracurriculars here..."
                                rows={3}
                                value={extracurriculars}
                                onChange={(e) =>
                                    setExtracurriculars(e.target.value)
                                }
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
                                <span className="material-symbols-outlined text-[20px] animate-spin">
                                    progress_activity
                                </span>
                                Saving...
                            </>
                        )}
                        {saveStatus === "saved" && (
                            <>
                                <span className="material-symbols-outlined text-[20px]">
                                    check_circle
                                </span>
                                Saved!
                            </>
                        )}
                        {saveStatus === "idle" && (
                            <>
                                <span className="material-symbols-outlined text-[20px]">
                                    save
                                </span>
                                Save Profile
                            </>
                        )}
                    </button>
                </div>
            </div>
        </main>
    );
}
