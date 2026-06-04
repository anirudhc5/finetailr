export interface Application {
    id: string;
    company: string;
    title: string;
    description: string;
    matchedKeywords: string[];
    missingKeywords: string[];
    tailoredBullets: { original: string; rewritten: string }[];
    recommendation: string;
    date: string;
}

export interface Experience {
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export interface Project {
    name: string;
    description: string;
}

export interface Education {
    univ: string;
    degree: string;
    field: string;
    startDate?: string;
    endDate: string;
    gpa?: string;
}
