import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { mockResumeData } from '../data/mockResumeData';
import { ResumeSection } from '../types/enums';
import {
    Certification,
    Education,
    Language,
    PersonalInfo,
    Project,
    Skill,
    Theme,
    WorkExperience
} from '../types/interfaces';

export type TemplateId = 'modern' | 'classic' | 'creative' | 'minimal' | 'professional';

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: Skill[];
  experiences: WorkExperience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  theme: Theme;
  template: TemplateId;
}

const emptyResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    title: '',
  },
  summary: '',
  skills: [],
  experiences: [],
  education: [],
  projects: [],
  certifications: [],
  languages: [],
  theme: {
    primaryColor: '#007AFF',
    secondaryColor: '#5856D6',
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    fontFamily: 'System',
  },
  template: 'modern',
};

interface ResumeContextType {
  resumeData: ResumeData;
  currentSection: ResumeSection;
  isLoading: boolean;
  handleSectionChange: (section: ResumeSection) => void;
  handlePersonalInfoChange: (data: PersonalInfo) => void;
  handleSummaryChange: (summary: string) => void;
  handleSkillsChange: (skills: Skill[]) => void;
  handleExperiencesChange: (experiences: WorkExperience[]) => void;
  handleEducationChange: (education: Education[]) => void;
  handleProjectsChange: (projects: Project[]) => void;
  handleCertificationsChange: (certifications: Certification[]) => void;
  handleLanguagesChange: (languages: Language[]) => void;
  handleThemeChange: (theme: Theme) => void;
  handleTemplateChange: (template: TemplateId) => void;
  resetToMockData: () => Promise<void>;
  forceReloadMockData: () => Promise<void>;
}

export const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [currentSection, setCurrentSection] = useState<ResumeSection>(ResumeSection.PERSONAL_INFO);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResumeData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveResumeData();
    }
  }, [resumeData, isLoading]);

  const loadResumeData = async () => {
    try {
      // In development mode, you can force using mock data by uncommenting this line:
      // await AsyncStorage.removeItem('resumeData');
      
      const savedData = await AsyncStorage.getItem('resumeData');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (isValidResumeData(parsedData)) {
          setResumeData(parsedData);
        } else {
          console.warn('Invalid saved data structure, using mock data');
          setResumeData(mockResumeData);
        }
      } else {
        console.log('No saved data found, using mock data');
        setResumeData(mockResumeData);
      }
    } catch (error) {
      console.error('Error loading resume data:', error);
      setResumeData(mockResumeData);
    } finally {
      setIsLoading(false);
    }
  };

  const saveResumeData = async () => {
    try {
      await AsyncStorage.setItem('resumeData', JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  };

  const resetToMockData = async () => {
    try {
      await AsyncStorage.removeItem('resumeData');
      const initializedData = {
        ...mockResumeData,
        skills: mockResumeData.skills || [],
        experiences: mockResumeData.experiences || [],
        education: mockResumeData.education || [],
        projects: mockResumeData.projects || [],
        certifications: mockResumeData.certifications || [],
        languages: mockResumeData.languages || [],
      };
      setResumeData(initializedData);
      await AsyncStorage.setItem('resumeData', JSON.stringify(initializedData));
    } catch (error) {
      console.error('Error resetting to mock data:', error);
      // Fallback to empty data if mock data fails
      setResumeData(emptyResumeData);
    }
  };

  const isValidResumeData = (data: any): data is ResumeData => {
    if (!data || typeof data !== 'object') return false;

    const requiredFields = [
      'personalInfo',
      'summary',
      'skills',
      'experiences',
      'education',
      'projects',
      'certifications',
      'languages',
      'theme',
      'template'
    ];

    if (!requiredFields.every(field => field in data)) {
      return false;
    }

    if (!data.personalInfo || typeof data.personalInfo !== 'object') return false;
    const requiredPersonalInfoFields = ['fullName', 'email', 'phone', 'location', 'title'];
    if (!requiredPersonalInfoFields.every(field => field in data.personalInfo)) {
      return false;
    }

    if (!Array.isArray(data.skills) || !Array.isArray(data.experiences) ||
        !Array.isArray(data.education) || !Array.isArray(data.projects) ||
        !Array.isArray(data.certifications) || !Array.isArray(data.languages)) {
      return false;
    }

    if (!data.theme || typeof data.theme !== 'object') return false;
    const requiredThemeFields = ['primaryColor', 'secondaryColor', 'backgroundColor', 'textColor', 'fontFamily'];
    if (!requiredThemeFields.every(field => field in data.theme)) {
      return false;
    }

    return true;
  };

  const handleSectionChange = (section: ResumeSection) => {
    setCurrentSection(section);
  };

  const handlePersonalInfoChange = (data: PersonalInfo) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: data,
    }));
  };

  const handleSummaryChange = (summary: string) => {
    setResumeData(prev => ({
      ...prev,
      summary,
    }));
  };

  const handleSkillsChange = (skills: Skill[]) => {
    setResumeData(prev => ({
      ...prev,
      skills,
    }));
  };

  const handleExperiencesChange = (experiences: WorkExperience[]) => {
    setResumeData(prev => ({
      ...prev,
      experiences,
    }));
  };

  const handleEducationChange = (education: Education[]) => {
    setResumeData(prev => ({
      ...prev,
      education,
    }));
  };

  const handleProjectsChange = (projects: Project[]) => {
    setResumeData(prev => ({
      ...prev,
      projects,
    }));
  };

  const handleCertificationsChange = (certifications: Certification[]) => {
    setResumeData(prev => ({
      ...prev,
      certifications,
    }));
  };

  const handleLanguagesChange = (languages: Language[]) => {
    setResumeData(prev => ({
      ...prev,
      languages,
    }));
  };

  const handleThemeChange = (theme: Theme) => {
    setResumeData(prev => ({
      ...prev,
      theme,
    }));
  };

  const handleTemplateChange = (template: TemplateId) => {
    setResumeData(prev => ({
      ...prev,
      template,
    }));
  };

  const forceReloadMockData = async () => {
    try {
      await AsyncStorage.removeItem('resumeData');
      setResumeData(mockResumeData);
      await AsyncStorage.setItem('resumeData', JSON.stringify(mockResumeData));
      console.log('Mock data reloaded successfully');
    } catch (error) {
      console.error('Error forcing reload of mock data:', error);
      setResumeData(emptyResumeData);
    }
  };

  const value = {
    resumeData,
    currentSection,
    isLoading,
    handleSectionChange,
    handlePersonalInfoChange,
    handleSummaryChange,
    handleSkillsChange,
    handleExperiencesChange,
    handleEducationChange,
    handleProjectsChange,
    handleCertificationsChange,
    handleLanguagesChange,
    handleThemeChange,
    handleTemplateChange,
    resetToMockData,
    forceReloadMockData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResumeBuilder() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeBuilder must be used within a ResumeProvider');
  }
  return context;
} 