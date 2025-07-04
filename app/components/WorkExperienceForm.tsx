import { Ionicons } from '@expo/vector-icons';
import { isEmpty, isNil, map } from 'lodash';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BORDER_RADIUS, FONT_SIZE, INPUT_HEIGHT, SPACING } from '../styles/responsive';
import { WorkExperienceFormProps } from '../types/interfaces';
import { validateDateRange, validateField } from '../utils/validationUtils';
import DateInput from './DateInput';
import Text from './Text';

export default function WorkExperienceForm({ experiences, onChange, fontFamily }: WorkExperienceFormProps) {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});


  const handleUpdateExperience = (id: string, field: string, value: any) => {
    const updatedExperiences = map(experiences, experience => {
      if (experience.id === id) {
        const updatedExperience = { ...experience, [field]: value };
        
        // Validate date range if dates are being updated
        if (field === 'startDate' || field === 'endDate' || field === 'current') {
          const dateError = validateDateRange(
            updatedExperience.startDate,
            updatedExperience.endDate,
            updatedExperience.current
          );
          
          if (dateError) {
            setErrors(prev => ({
              ...prev,
              [id]: { ...prev[id], date: dateError.message }
            }));
          } else {
            setErrors(prev => {
              const newErrors = { ...prev };
              if (newErrors[id]) {
                delete newErrors[id].date;
                if (isEmpty(newErrors[id])) {
                  delete newErrors[id];
                }
              }
              return newErrors;
            });
          }
        }

        // Validate other fields
        const error = validateField(field, value);
        if (error) {
          setErrors(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: error.message }
          }));
        } else {
          setErrors(prev => {
            const newErrors = { ...prev };
            if (newErrors[id]) {
              delete newErrors[id][field];
              if (isEmpty(newErrors[id])) {
                delete newErrors[id];
              }
            }
            return newErrors;
          });
        }
        return updatedExperience;
      }
      return experience;
    });
    onChange(updatedExperiences);
  };

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    };
    onChange([...experiences, newExperience]);
  };

  const handleRemoveExperience = (id: string) => {
    onChange(experiences.filter(experience => experience.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleAddAchievement = (experienceId: string) => {
    const updatedExperiences = map(experiences, experience => {
      if (experience.id === experienceId) {
        return {
          ...experience,
          achievements: [...(experience.achievements || []), ''],
        };
      }
      return experience;
    });
    onChange(updatedExperiences);
  };

  const handleUpdateAchievement = (experienceId: string, index: number, value: string) => {
    const updatedExperiences = map(experiences, experience => {
      if (experience.id === experienceId) {
        const updatedAchievements = [...(experience.achievements || [])];
        updatedAchievements[index] = value;
        return {
          ...experience,
          achievements: updatedAchievements,
        };
      }
      return experience;
    });
    onChange(updatedExperiences);
  };

  const handleRemoveAchievement = (experienceId: string, index: number) => {
    const updatedExperiences = map(experiences, experience => {
      if (experience.id === experienceId) {
        const updatedAchievements = (experience.achievements || []).filter((_, i) => i !== index);
        return {
          ...experience,
          achievements: updatedAchievements,
        };
      }
      return experience;
    });
    onChange(updatedExperiences);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Work Experience</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        List your work experience in reverse chronological order. Include your roles, responsibilities, and achievements.
      </Text>

      {map(experiences, (experience, index) => {
        console.log('Description for experience', experience.id, ':', experience.description);
        return (
        <View key={experience.id} style={styles.experienceCard}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { fontFamily }]}>
              Experience {index + 1}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveExperience(experience.id)}
              style={styles.removeButton}
            >
              <Ionicons name="close-circle" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Company</Text>
              <TextInput
                style={[styles.input, !isNil(errors[experience.id]?.company) && styles.inputError, { fontFamily }]}
                value={experience.company}
                onChangeText={(value) => handleUpdateExperience(experience.id, 'company', value)}
                placeholder="e.g., Google"
                placeholderTextColor="#999"
              />
              {!isNil(errors[experience.id]?.company) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[experience.id].company}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Position</Text>
              <TextInput
                style={[styles.input, !isNil(errors[experience.id]?.position) && styles.inputError, { fontFamily }]}
                value={experience.position}
                onChangeText={(value) => handleUpdateExperience(experience.id, 'position', value)}
                placeholder="e.g., Senior Software Engineer"
                placeholderTextColor="#999"
              />
              {!isNil(errors[experience.id]?.position) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[experience.id].position}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Location</Text>
              <TextInput
                style={[styles.input, !isNil(errors[experience.id]?.location) && styles.inputError, { fontFamily }]}
                value={experience.location}
                onChangeText={(value) => handleUpdateExperience(experience.id, 'location', value)}
                placeholder="e.g., Mountain View, CA"
                placeholderTextColor="#999"
              />
              {!isNil(errors[experience.id]?.location) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[experience.id].location}</Text>
              )}
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateInput}>
                <Text style={[styles.label, { fontFamily }]}>Start Date</Text>
                <DateInput
                  value={experience.startDate}
                  onChange={(value) => handleUpdateExperience(experience.id, 'startDate', value)}
                  fontFamily={fontFamily}
                />
              </View>

              <View style={styles.dateInput}>
                <Text style={[styles.label, { fontFamily }]}>End Date</Text>
                <DateInput
                  value={experience.endDate}
                  onChange={(value) => handleUpdateExperience(experience.id, 'endDate', value)}
                  fontFamily={fontFamily}
                  placeholder={experience.current ? 'Present' : 'MM/YYYY'}
                />
              </View>
            </View>

            {!isNil(errors[experience.id]?.date) && (
              <Text style={[styles.errorText, { fontFamily }]}>{errors[experience.id].date}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, experience.current && styles.checkboxChecked]}
                onPress={() => handleUpdateExperience(experience.id, 'current', !experience.current)}
              >
                {experience.current && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={[styles.checkboxLabel, { fontFamily }]}>Currently Working</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Description</Text>
              <TextInput
                style={[styles.textArea, !isNil(errors[experience.id]?.description) && styles.inputError, { fontFamily }]}
                value={experience.description}
                onChangeText={(value) => handleUpdateExperience(experience.id, 'description', value)}
                placeholder="Describe your responsibilities and achievements..."
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
                scrollEnabled={true}
              />
              {!isNil(errors[experience.id]?.description) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[experience.id].description}</Text>
              )}
            </View>

            <View style={styles.achievementsContainer}>
              <Text style={[styles.label, { fontFamily }]}>Key Achievements</Text>
              {map(experience.achievements || [], (achievement, achievementIndex) => (
                <View key={achievementIndex} style={styles.achievementItem}>
                  <TextInput
                    style={[styles.achievementInput, { fontFamily }]}
                    value={achievement}
                    onChangeText={(value) => handleUpdateAchievement(experience.id, achievementIndex, value)}
                    placeholder="Enter an achievement..."
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    onPress={() => handleRemoveAchievement(experience.id, achievementIndex)}
                    style={styles.removeAchievementButton}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addAchievementButton}
                onPress={() => handleAddAchievement(experience.id)}
              >
                <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                <Text style={[styles.addAchievementText, { fontFamily }]}>Add Achievement</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        );
      })}

      <TouchableOpacity style={styles.addButton} onPress={handleAddExperience}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={[styles.addButtonText, { fontFamily }]}>Add Experience</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  } as ViewStyle,
  sectionTitle: {
    fontSize: FONT_SIZE.h3,
    fontWeight: '600',
    color: '#333',
    marginBottom: SPACING.sm,
  } as TextStyle,
  sectionDescription: {
    fontSize: FONT_SIZE.bodySmall,
    color: '#666',
    marginBottom: SPACING.lg,
  } as TextStyle,
  experienceCard: {
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  } as ViewStyle,
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  } as ViewStyle,
  cardTitle: {
    fontSize: FONT_SIZE.h4,
    fontWeight: '600',
    color: '#333',
  } as TextStyle,
  removeButton: {
    padding: SPACING.xs,
  } as ViewStyle,
  form: {
    gap: SPACING.md,
  } as ViewStyle,
  inputGroup: {
    gap: SPACING.xs,
  } as ViewStyle,
  label: {
    fontSize: FONT_SIZE.bodySmall,
    color: '#333',
    fontWeight: '500',
  } as TextStyle,
  input: {
    height: INPUT_HEIGHT.medium,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.body,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  } as TextStyle,
  inputError: {
    borderColor: '#FF3B30',
  } as TextStyle,
  errorText: {
    fontSize: FONT_SIZE.bodySmall,
    color: '#FF3B30',
    marginTop: SPACING.xs,
  } as TextStyle,
  textArea: {
    minHeight: 200,
    maxHeight: 800,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    fontSize: FONT_SIZE.body,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  } as TextStyle,
  dateContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  } as ViewStyle,
  dateInput: {
    flex: 1,
    gap: SPACING.xs,
  } as ViewStyle,
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  } as ViewStyle,
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  checkboxChecked: {
    backgroundColor: '#007AFF',
  } as ViewStyle,
  checkboxLabel: {
    fontSize: FONT_SIZE.body,
    color: '#333',
  } as TextStyle,
  achievementsContainer: {
    gap: SPACING.sm,
  } as ViewStyle,
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  } as ViewStyle,
  achievementInput: {
    flex: 1,
    height: INPUT_HEIGHT.medium,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.body,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  } as TextStyle,
  removeAchievementButton: {
    padding: SPACING.xs,
  } as ViewStyle,
  addAchievementButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    padding: SPACING.sm,
  } as ViewStyle,
  addAchievementText: {
    fontSize: FONT_SIZE.body,
    color: '#007AFF',
  } as TextStyle,
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
  } as ViewStyle,
  addButtonText: {
    color: '#fff',
    fontSize: FONT_SIZE.button,
    fontWeight: '600',
  } as TextStyle,
}); 