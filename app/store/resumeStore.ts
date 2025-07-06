import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
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

interface ResumeStore {
  // State
  resumeData: ResumeData;
  currentSection: ResumeSection;
  isLoading: boolean;
  
  // Actions
  setCurrentSection: (section: ResumeSection) => void;
  setPersonalInfo: (data: PersonalInfo) => void;
  setSummary: (summary: string) => void;
  setSkills: (skills: Skill[]) => void;
  setExperiences: (experiences: WorkExperience[]) => void;
  setEducation: (education: Education[]) => void;
  setProjects: (projects: Project[]) => void;
  setCertifications: (certifications: Certification[]) => void;
  setLanguages: (languages: Language[]) => void;
  setTheme: (theme: Theme) => void;
  setTemplate: (template: TemplateId) => void;
  resetToMockData: () => void;
  forceReloadMockData: () => void;
  setLoading: (loading: boolean) => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      // Initial state
      resumeData: mockResumeData,
      currentSection: ResumeSection.PERSONAL_INFO,
      isLoading: true,

      // Actions
      setCurrentSection: (section) => set({ currentSection: section }),
      
      setPersonalInfo: (data) => 
        set((state) => ({
          resumeData: { ...state.resumeData, personalInfo: data }
        })),
      
      setSummary: (summary) => 
        set((state) => ({
          resumeData: { ...state.resumeData, summary }
        })),
      
      setSkills: (skills) => 
        set((state) => ({
          resumeData: { ...state.resumeData, skills }
        })),
      
      setExperiences: (experiences) => 
        set((state) => ({
          resumeData: { ...state.resumeData, experiences }
        })),
      
      setEducation: (education) => 
        set((state) => ({
          resumeData: { ...state.resumeData, education }
        })),
      
      setProjects: (projects) => 
        set((state) => ({
          resumeData: { ...state.resumeData, projects }
        })),
      
      setCertifications: (certifications) => 
        set((state) => ({
          resumeData: { ...state.resumeData, certifications }
        })),
      
      setLanguages: (languages) => 
        set((state) => ({
          resumeData: { ...state.resumeData, languages }
        })),
      
      setTheme: (theme) => 
        set((state) => ({
          resumeData: { ...state.resumeData, theme }
        })),
      
      setTemplate: (template) => 
        set((state) => ({
          resumeData: { ...state.resumeData, template }
        })),
      
      resetToMockData: () => {
        const initializedData = {
          ...mockResumeData,
          skills: mockResumeData.skills || [],
          experiences: mockResumeData.experiences || [],
          education: mockResumeData.education || [],
          projects: mockResumeData.projects || [],
          certifications: mockResumeData.certifications || [],
          languages: mockResumeData.languages || [],
        };
        set({ resumeData: initializedData });
      },
      
      forceReloadMockData: () => {
        set({ resumeData: mockResumeData });
        console.log('Mock data reloaded successfully');
      },
      
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'resume-storage', // unique name for the storage key
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage as the storage
      partialize: (state) => ({ 
        resumeData: state.resumeData,
        currentSection: state.currentSection 
      }), // only persist these fields
      onRehydrateStorage: () => (state) => {
        // Called when the store is rehydrated
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
); 