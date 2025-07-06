import { useResumeStore } from '../store/resumeStore';

export function useResumeBuilder() {
  const {
    resumeData,
    currentSection,
    isLoading,
    setCurrentSection,
    setPersonalInfo,
    setSummary,
    setSkills,
    setExperiences,
    setEducation,
    setProjects,
    setCertifications,
    setLanguages,
    setTheme,
    setTemplate,
    resetToMockData,
    forceReloadMockData,
  } = useResumeStore();

  return {
    resumeData,
    currentSection,
    isLoading,
    handleSectionChange: setCurrentSection,
    handlePersonalInfoChange: setPersonalInfo,
    handleSummaryChange: setSummary,
    handleSkillsChange: setSkills,
    handleExperiencesChange: setExperiences,
    handleEducationChange: setEducation,
    handleProjectsChange: setProjects,
    handleCertificationsChange: setCertifications,
    handleLanguagesChange: setLanguages,
    handleThemeChange: setTheme,
    handleTemplateChange: setTemplate,
    resetToMockData,
    forceReloadMockData,
  };
} 