import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import type { NavigationState, ParamListBase } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CertificationsForm from "./components/CertificationsForm";
import DevTools from "./components/DevTools";
import EducationForm from "./components/EducationForm";
import Footer from "./components/Footer";
import LanguagesForm from "./components/LanguagesForm";
import PersonalInfoForm from "./components/PersonalInfoForm";
import ProfessionalSummaryForm from "./components/ProfessionalSummaryForm";
import ProjectsForm from "./components/ProjectsForm";
import SkillsForm from "./components/SkillsForm";
import CustomText from "./components/Text";
import ThemeCustomizer from "./components/ThemeCustomizer";
import WorkExperienceForm from "./components/WorkExperienceForm";
import { useFont } from "./hooks/useFont";
import { useModal } from "./hooks/useModal";
import { useResumeBuilder } from "./hooks/useResumeBuilder";
import ExportModal from "./modal/ExportModal";
import { BORDER_RADIUS, FONT_SIZE, SPACING } from "./styles/responsive";
import templateComponents from './templates';
import { ResumeSection } from "./types/enums";

const Tab = createMaterialTopTabNavigator();

const sections = [
  { id: ResumeSection.PERSONAL_INFO, title: 'Personal Information', icon: 'person-outline' },
  { id: ResumeSection.SUMMARY, title: 'Professional Summary', icon: 'document-text-outline' },
  { id: ResumeSection.SKILLS, title: 'Skills', icon: 'code-slash-outline' },
  { id: ResumeSection.EXPERIENCE, title: 'Work Experience', icon: 'briefcase-outline' },
  { id: ResumeSection.PROJECTS, title: 'Projects', icon: 'folder-outline' },
  { id: ResumeSection.EDUCATION, title: 'Education', icon: 'school-outline' },
  { id: ResumeSection.CERTIFICATIONS, title: 'Certifications', icon: 'ribbon-outline' },
  { id: ResumeSection.LANGUAGES, title: 'Languages', icon: 'language-outline' },
];

export default function ResumeBuilderScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { fontFamily } = useFont();
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    resumeData,
    currentSection,
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
  } = useResumeBuilder();

  const SelectedTemplateComponent = templateComponents[resumeData.template as keyof typeof templateComponents] || templateComponents.modern;

  useEffect(() => {
    if (params.section) {
      handleSectionChange(params.section as ResumeSection);
    }
  }, [params.section]);

  const renderFormContent = (section: ResumeSection) => {
    switch (section) {
      case ResumeSection.PERSONAL_INFO:
        return (
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onChange={handlePersonalInfoChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.SUMMARY:
        return (
          <ProfessionalSummaryForm
            summary={resumeData.summary}
            onChange={handleSummaryChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.SKILLS:
        return (
          <SkillsForm
            skills={resumeData.skills}
            onChange={handleSkillsChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.EXPERIENCE:
        return (
          <WorkExperienceForm
            experiences={resumeData.experiences}
            onChange={handleExperiencesChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.PROJECTS:
        return (
          <ProjectsForm
            projects={resumeData.projects}
            onChange={handleProjectsChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.EDUCATION:
        return (
          <EducationForm
            education={resumeData.education}
            onChange={handleEducationChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.CERTIFICATIONS:
        return (
          <CertificationsForm
            certifications={resumeData.certifications}
            onChange={handleCertificationsChange}
            fontFamily={fontFamily}
          />
        );
      case ResumeSection.LANGUAGES:
        return (
          <LanguagesForm
            languages={resumeData.languages}
            onChange={handleLanguagesChange}
            fontFamily={fontFamily}
          />
        );

      default:
        return (
          <View style={styles.placeholderContainer}>
            <Ionicons name="construct-outline" size={48} color="#666" />
            <CustomText
              variant="bodyLarge"
              color="#666"
              fontFamily={fontFamily}
              style={{
                textAlign: "center",
                marginTop: SPACING.lg,
                marginBottom: SPACING.sm,
              }}
            >
              {`${
                sections.find((s) => s.id === section)?.title
              } form will be added soon`}
            </CustomText>
            <CustomText
              variant="bodySmall"
              color="#999"
              fontFamily={fontFamily}
              style={{ textAlign: "center" }}
            >
              We're working on implementing this section
            </CustomText>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Create Resume",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: fontFamily,
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.previewButton}
              onPress={() => router.push("preview" as any)}
            >
              <Ionicons name="eye-outline" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.content}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIndicatorStyle: styles.tabIndicator,
            tabBarScrollEnabled: true,
            tabBarItemStyle: styles.tabItem,
            tabBarActiveTintColor: "#007AFF",
            tabBarInactiveTintColor: "#666",
            tabBarPressColor: "transparent",
            tabBarPressOpacity: 1,
          }}
          initialRouteName={params.section as string}
          screenListeners={{
            state: (e) => {
              const state = e.data.state as NavigationState<ParamListBase>;
              const route = state.routes[state.index];
              if (route?.name) {
                handleSectionChange(route.name as ResumeSection);
              }
            },
          }}
        >
          {sections.map((section) => (
            <Tab.Screen
              key={section.id}
              name={section.id}
              options={{
                tabBarLabel: ({ color }) => (
                  <View style={styles.tabLabelContainer}>
                    <Ionicons
                      name={section.icon as any}
                      size={20}
                      color={color}
                    />
                    <CustomText
                      variant="bodySmall"
                      color={color}
                      fontFamily={fontFamily}
                      style={styles.tabLabelText}
                    >
                      {section.title}
                    </CustomText>
                  </View>
                ),
              }}
            >
              {() => (
                <ScrollView
                  contentContainerStyle={styles.formContent}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                >
                  <View style={styles.formCard}>
                    {renderFormContent(section.id)}
                  </View>
                </ScrollView>
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>

        <Footer
          fontFamily={fontFamily}
          onExport={() => openModal()}
          onTemplate={() => router.push("templates" as any)}
          onTheme={openModal}
          style={styles.footer}
        />

        {/* Development Tools - Remove in production */}
        <DevTools fontFamily={fontFamily} />

        <ThemeCustomizer
          theme={resumeData?.theme}
          onChange={handleThemeChange}
          fontFamily={fontFamily}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        <ExportModal
          isOpen={isModalOpen}
          onClose={closeModal}
          resumeData={resumeData}
          SelectedTemplateComponent={SelectedTemplateComponent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
  },
  previewButton: {
    marginRight: SPACING.md,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: "#f0f0f0",
  },
  tabBar: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tabLabel: {
    textTransform: "none",
    fontFamily: "System",
  },
  tabIndicator: {
    backgroundColor: "#007AFF",
    height: 2,
  },
  tabItem: {
    width: "auto",
    paddingHorizontal: SPACING.md,
  },
  tabLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  tabLabelText: {
    marginLeft: SPACING.xs,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  formContent: {
    padding: SPACING.sm,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SPACING.xl,
  },
  placeholderText: {
    fontSize: FONT_SIZE.bodyLarge,
    color: "#666",
    textAlign: "center",
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  placeholderSubtext: {
    fontSize: FONT_SIZE.bodySmall,
    color: "#999",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    padding: SPACING.sm,
    borderTopColor: "#e0e0e0",
    gap: SPACING.md,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
