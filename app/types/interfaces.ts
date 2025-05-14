import { SkillCategory } from './enums';

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  title: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: number;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  achievements: string[];
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  current: boolean;
  link: string;
  duration: string;
  role: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

export interface PersonalInfoFormProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    website: string;
    linkedin: string;
    github: string;
  };
  onChange: (data: any) => void;
  fontFamily?: string;
}

export interface ProfessionalSummaryFormProps {
  summary: string;
  onChange: (value: string) => void;
  fontFamily: string;
}

export interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  fontFamily: string;
}

export interface WorkExperienceFormProps {
  experiences: WorkExperience[];
  onChange: (experiences: WorkExperience[]) => void;
  fontFamily: string;
}

export interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
  fontFamily: string;
}

export interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
  fontFamily: string;
}

export interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
  fontFamily: string;
}

export interface LanguagesFormProps {
  languages: Language[];
  onChange: (languages: Language[]) => void;
  fontFamily: string;
}

export interface ThemeCustomizerProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
  fontFamily: string;
} 