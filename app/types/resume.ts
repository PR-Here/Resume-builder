export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    address?: string;
  };
  summary: string;
  skills: {
    technical: string[];
    soft: string[];
    domain: string[];
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements: string[];
    location?: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    role: string;
    link?: string;
    duration?: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
    location?: string;
    achievements?: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    credentialId?: string;
    link?: string;
  }>;
  awards: Array<{
    title: string;
    issuer: string;
    date: string;
    description?: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
  }>;
  additionalSections: {
    interests?: string[];
    volunteer?: Array<{
      organization: string;
      role: string;
      duration: string;
      description: string;
    }>;
    references?: Array<{
      name: string;
      position: string;
      company: string;
      contact: string;
    }>;
    publications?: Array<{
      title: string;
      publisher: string;
      date: string;
      link?: string;
    }>;
  };
}

export interface ResumeStyle {
  template: string;
  font: string;
  primaryColor: string;
  secondaryColor: string;
  sectionOrder: string[];
}

export interface ResumeSettings {
  style: ResumeStyle;
  showSections: {
    [key: string]: boolean;
  };
} 