import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { EducationFormProps, Education } from '../types/interfaces';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { validateField } from '../utils/validationUtils';

export default function EducationForm({ education = [], onChange, fontFamily }: EducationFormProps) {
  const [error, setError] = useState<string>('');

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      location: '',
      year: '',
      achievements: [],
    };
    onChange([...education, newEducation]);
  };

  const handleRemoveEducation = (index: number) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string | string[]) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onChange(updatedEducation);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Education</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        List your educational background in reverse chronological order. Include your degrees, majors, and any relevant coursework.
      </Text>

      <View style={styles.form}>
        {education.map((edu: Education, index: number) => (
          <View key={edu.id || index} style={styles.educationCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { fontFamily }]}>Education {index + 1}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveEducation(index)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Institution</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={edu.institution}
                onChangeText={(value) => handleEducationChange(index, 'institution', value)}
                placeholder="e.g., University of California, Berkeley"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Degree</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={edu.degree}
                onChangeText={(value) => handleEducationChange(index, 'degree', value)}
                placeholder="e.g., Bachelor of Science"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Location</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={edu.location}
                onChangeText={(value) => handleEducationChange(index, 'location', value)}
                placeholder="e.g., Berkeley, CA"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Year</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={edu.year}
                onChangeText={(value) => handleEducationChange(index, 'year', value)}
                placeholder="e.g., 2020"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Achievements</Text>
              {edu.achievements.map((achievement: string, achievementIndex: number) => (
                <View key={achievementIndex} style={styles.achievementItem}>
                  <TextInput
                    style={[styles.input, { fontFamily }]}
                    value={achievement}
                    onChangeText={(value) => {
                      const updatedAchievements = [...edu.achievements];
                      updatedAchievements[achievementIndex] = value;
                      handleEducationChange(index, 'achievements', updatedAchievements);
                    }}
                    placeholder="Enter an achievement..."
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    style={styles.removeAchievementButton}
                    onPress={() => {
                      const updatedAchievements = edu.achievements.filter((_, i: number) => i !== achievementIndex);
                      handleEducationChange(index, 'achievements', updatedAchievements);
                    }}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addAchievementButton}
                onPress={() => {
                  const updatedAchievements = [...edu.achievements, ''];
                  handleEducationChange(index, 'achievements', updatedAchievements);
                }}
              >
                <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                <Text style={[styles.addAchievementText, { fontFamily }]}>Add Achievement</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddEducation}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={[styles.addButtonText, { fontFamily }]}>Add Education</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  sectionTitle: {
    fontSize: FONT_SIZE.h2,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  } as TextStyle,
  sectionDescription: {
    fontSize: FONT_SIZE.body,
    color: '#666',
    marginBottom: SPACING.lg,
  } as TextStyle,
  form: {
    gap: SPACING.lg,
  } as ViewStyle,
  educationCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as ViewStyle,
  cardTitle: {
    fontSize: FONT_SIZE.h3,
    fontWeight: '600',
  } as TextStyle,
  removeButton: {
    padding: SPACING.xs,
  } as ViewStyle,
  inputGroup: {
    gap: SPACING.xs,
  } as ViewStyle,
  label: {
    fontSize: FONT_SIZE.body,
    fontWeight: '500',
  } as TextStyle,
  input: {
    height: INPUT_HEIGHT.medium,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.body,
  } as TextStyle,
  textArea: {
    minHeight: INPUT_HEIGHT.large * 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    fontSize: FONT_SIZE.body,
  } as TextStyle,
  dateContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  } as ViewStyle,
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  } as ViewStyle,
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  checkboxLabel: {
    fontSize: FONT_SIZE.body,
    color: '#666',
  } as TextStyle,
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    backgroundColor: '#007AFF',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  } as ViewStyle,
  addButtonText: {
    fontSize: FONT_SIZE.body,
    color: '#fff',
    fontWeight: '500',
  } as TextStyle,
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  } as ViewStyle,
  removeAchievementButton: {
    padding: SPACING.xs,
  } as ViewStyle,
  addAchievementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
  } as ViewStyle,
  addAchievementText: {
    fontSize: FONT_SIZE.body,
    color: '#007AFF',
  } as TextStyle,
}); 