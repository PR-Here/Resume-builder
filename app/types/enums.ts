export enum LanguageProficiency {
  NATIVE = 'Native',
  FLUENT = 'Fluent',
  ADVANCED = 'Advanced',
  INTERMEDIATE = 'Intermediate',
  BASIC = 'Basic',
}

export enum ResumeSection {
  PERSONAL_INFO = 'personal-info',
  SUMMARY = 'summary',
  SKILLS = 'skills',
  EXPERIENCE = 'experience',
  PROJECTS = 'projects',
  EDUCATION = 'education',
  CERTIFICATIONS = 'certifications',
  AWARDS = 'awards',
  LANGUAGES = 'languages',
  INTERESTS = 'interests',
  VOLUNTEER = 'volunteer',
  REFERENCES = 'references',
  PUBLICATIONS = 'publications',
  THEME = 'THEME',
}

export enum TemplateType {
  PROFESSIONAL = 'professional',
  MODERN = 'modern',
  CREATIVE = 'creative',
  MINIMAL = 'minimal',
  EXECUTIVE = 'executive',
}

export enum FontFamily {
  DMSANS_REGULAR = 'DMSans_400Regular',
  DMSANS_MEDIUM = 'DMSans_500Medium',
  DMSANS_BOLD = 'DMSans_700Bold',
}

export enum ColorTheme {
  BLUE = '#007AFF',
  DARK_BLUE = '#0055CC',
  RED = '#FF3B30',
  ORANGE = '#FF9500',
  GREEN = '#34C759',
  PURPLE = '#AF52DE',
}

export enum SkillCategory {
  LANGUAGE = 'language',
  SOFT = 'soft',
  TECHNICAL = 'technical',
  TOOL = 'tool',
}

export enum ExportFormat {
  PDF = 'pdf',
  DOCX = 'docx',
  TXT = 'txt',
}

export const DEFAULT_SECTION_ORDER = [
  ResumeSection.PERSONAL_INFO,
  ResumeSection.SUMMARY,
  ResumeSection.SKILLS,
  ResumeSection.EXPERIENCE,
  ResumeSection.PROJECTS,
  ResumeSection.EDUCATION,
  ResumeSection.CERTIFICATIONS,
  ResumeSection.AWARDS,
  ResumeSection.LANGUAGES,
  ResumeSection.INTERESTS,
  ResumeSection.VOLUNTEER,
  ResumeSection.REFERENCES,
  ResumeSection.PUBLICATIONS,
];

export const DEFAULT_TEMPLATE_SETTINGS = {
  template: TemplateType.PROFESSIONAL,
  font: FontFamily.ROBOTO,
  primaryColor: ColorTheme.BLUE,
  secondaryColor: ColorTheme.DARK_BLUE,
  sectionOrder: DEFAULT_SECTION_ORDER,
};

export const DEFAULT_VISIBLE_SECTIONS = {
  [ResumeSection.PERSONAL_INFO]: true,
  [ResumeSection.SUMMARY]: true,
  [ResumeSection.SKILLS]: true,
  [ResumeSection.EXPERIENCE]: true,
  [ResumeSection.PROJECTS]: true,
  [ResumeSection.EDUCATION]: true,
  [ResumeSection.CERTIFICATIONS]: true,
  [ResumeSection.AWARDS]: false,
  [ResumeSection.LANGUAGES]: false,
  [ResumeSection.INTERESTS]: false,
  [ResumeSection.VOLUNTEER]: false,
  [ResumeSection.REFERENCES]: false,
  [ResumeSection.PUBLICATIONS]: false,
};

export const TEMPLATE_PREVIEWS = {
  [TemplateType.PROFESSIONAL]: {
    name: 'Professional',
    thumbnail: 'https://example.com/professional-template.jpg',
    description: 'Clean and traditional layout perfect for any industry',
  },
  [TemplateType.MODERN]: {
    name: 'Modern',
    thumbnail: 'https://example.com/modern-template.jpg',
    description: 'Contemporary design with bold colors and modern typography',
  },
  [TemplateType.CREATIVE]: {
    name: 'Creative',
    thumbnail: 'https://example.com/creative-template.jpg',
    description: 'Unique and eye-catching design for creative professionals',
  },
  [TemplateType.MINIMAL]: {
    name: 'Minimal',
    thumbnail: 'https://example.com/minimal-template.jpg',
    description: 'Simple and elegant design focusing on content',
  },
  [TemplateType.EXECUTIVE]: {
    name: 'Executive',
    thumbnail: 'https://example.com/executive-template.jpg',
    description: 'Sophisticated layout for senior professionals',
  },
}; 