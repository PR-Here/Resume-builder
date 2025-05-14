import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform, Dimensions, ActivityIndicator, SafeAreaView, TouchableOpacity, Linking, FlatList } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { getResponsiveHeight, getResponsiveWidth, SPACING } from './styles/responsive';
import { useResumeBuilder } from './hooks/useResumeBuilder';
import CustomText from './components/Text';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { TemplateId } from './context/ResumeContext';
import templateComponents from './templates';
import type { ComponentType } from 'react';

const { width } = Dimensions.get('window');

const TEMPLATE_LIST: { id: TemplateId; label: string }[] = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
  // Add more templates here as you create them
];

const templateComponentsTyped: { [key in 'modern' | 'classic']: ComponentType<any> } = templateComponents;

export default function PreviewScreen() {
  const router = useRouter();
  const { resumeData, isLoading, resetToMockData, handleTemplateChange } = useResumeBuilder();
  const [isResetting, setIsResetting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(resumeData.template || 'modern');
  const [exportModalVisible, setExportModalVisible] = useState(false);

  useEffect(() => {
    if (!isLoading && (!resumeData || Object.keys(resumeData).length === 0)) {
      handleReset();
    }
  }, [isLoading, resumeData]);

  useEffect(() => {
    setSelectedTemplate(resumeData.template || 'modern');
  }, [resumeData.template]);

  // Dynamically get the selected template component
  const SelectedTemplateComponent = templateComponentsTyped[selectedTemplate as 'modern' | 'classic'] || templateComponentsTyped.modern;

  const handleReset = async () => {
    try {
      setIsResetting(true);
      await resetToMockData();
    } catch (error) {
      console.error('Error resetting data:', error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
    handleTemplateChange(templateId);
  };

  if (isLoading || isResetting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <CustomText style={styles.loadingText}>
          {isResetting ? 'Resetting to mock data...' : 'Loading resume data...'}
        </CustomText>
      </View>
    );
  }

  if (!resumeData) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF3B30" />
        <CustomText style={styles.errorText}>Failed to load resume data</CustomText>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={handleReset}
          disabled={isResetting}
        >
          <CustomText style={styles.retryButtonText}>
            {isResetting ? 'Resetting...' : 'Reset to Mock Data'}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  }

 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <Stack.Screen
        options={{
          title: 'Preview Resume',
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />

      <ScrollView style={{ flex: 1, marginBottom: 130, marginTop: 100 }}>
        {/* Main Resume Preview */}
        <View style={styles.previewContainer}>
          <SelectedTemplateComponent resumeData={resumeData} previewMode={false} fontSize={16} />
        </View>
      </ScrollView>

      {/* Template Switcher */}
      <View style={styles.flatListContainer}>
        <FlatList
          data={TEMPLATE_LIST}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}
          renderItem={({ item }) => {
            const TemplateComponent = templateComponentsTyped[item.id as 'modern' | 'classic'];
            const isSelected = item.id === selectedTemplate;
            return (
              <TouchableOpacity
                onPress={() => handleSelectTemplate(item.id)}
                style={[
                  styles.templatePreviewWrapper,
                  isSelected && styles.selectedTemplate,
                ]}
              > 
                <TemplateComponent resumeData={resumeData} previewMode={true} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: SPACING.md,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: SPACING.xl,
  },
  errorText: {
    marginTop: SPACING.md,
    color: '#FF3B30',
    fontSize: 18,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.lg,
    backgroundColor: '#007AFF',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    marginRight: SPACING.md,
    padding: SPACING.sm,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: SPACING.xl,
  },
  headerGradient: {
    paddingTop: SPACING.xl * 2,
    paddingBottom: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  header: {
    paddingHorizontal: SPACING.lg,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: SPACING.xs,
  },
  title: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  contactInfo: {
    marginTop: SPACING.md,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  contactText: {
    marginLeft: SPACING.xs,
    color: '#fff',
  },
  summarySection: {
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.xl,
    borderRadius: 16,
    overflow: 'hidden',
  },
  summaryBlur: {
    padding: SPACING.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: SPACING.lg,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: SPACING.md,
  },
  summaryText: {
    color: '#666',
    lineHeight: 24,
    fontSize: 16,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  skillItem: {
    backgroundColor: '#f8f9fa',
    padding: SPACING.md,
    borderRadius: 12,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  skillName: {
    fontWeight: '600',
    marginBottom: SPACING.xs,
    fontSize: 15,
  },
  skillLevel: {
    flexDirection: 'row',
    gap: 4,
  },
  skillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
  },
  skillDotFilled: {
    backgroundColor: '#007AFF',
  },
  experienceItem: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  dateText: {
    color: '#666',
    fontSize: 14,
  },
  position: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  location: {
    color: '#666',
  },
  description: {
    color: '#666',
    lineHeight: 22,
    fontSize: 15,
  },
  achievementsContainer: {
    marginTop: SPACING.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  achievementText: {
    color: '#666',
    fontSize: 14,
  },
  projectItem: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 4,
  },
  currentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  projectDuration: {
    color: '#666',
  },
  projectIcon: {
    marginLeft: SPACING.sm,
  },
  projectRole: {
    color: '#666',
  },
  projectDescription: {
    color: '#666',
    marginBottom: SPACING.sm,
    lineHeight: 22,
    fontSize: 15,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  techItem: {
    backgroundColor: '#fff',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  techText: {
    fontSize: 13,
    color: '#666',
  },
  projectLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  educationItem: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  degree: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  institution: {
    color: '#666',
    marginBottom: SPACING.xs,
    fontSize: 15,
  },
  educationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  educationYear: {
    color: '#007AFF',
    marginRight: SPACING.sm,
  },
  educationIcon: {
    marginLeft: SPACING.sm,
  },
  educationLocation: {
    color: '#666',
  },
  certificationItem: {
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  certificationName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  certificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  certificationIssuer: {
    color: '#666',
  },
  certificationIcon: {
    marginLeft: SPACING.sm,
  },
  certificationDate: {
    color: '#666',
  },
  certificationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  languageItem: {
    backgroundColor: '#f8f9fa',
    padding: SPACING.md,
    borderRadius: 12,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  languageName: {
    fontWeight: '600',
    marginBottom: SPACING.xs,
    fontSize: 15,
  },
  proficiencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  languageLevel: {
    color: '#666',
  },
  previewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  flatListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    height: 110,
    backgroundColor: '#00000099',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  templatePreviewWrapper: {
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f4f4f4',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    height: getResponsiveHeight(40),
    width: getResponsiveWidth(40),
    justifyContent: 'flex-start',
    alignItems: 'center',
    
  },
  selectedTemplate: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f0ff',
  },
}); 