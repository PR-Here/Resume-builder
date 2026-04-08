import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { BORDER_RADIUS, FONT_SIZE, INPUT_HEIGHT, SPACING } from '../styles/responsive';
import { SkillCategory } from '../types/enums';
import { SkillsFormProps } from '../types/interfaces';
import { validateField } from '../utils/validationUtils';
import Text from './Text';

export default function SkillsForm({ skills, onChange, fontFamily }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const [error, setError] = useState<string>('');

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const validationResult = validateField('skill', newSkill);
    const errorMessage = validationResult ? validationResult.message : '';
    
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const skillExists = skills.some(skill => skill.name.toLowerCase() === newSkill.toLowerCase());
    if (skillExists) {
      setError('This skill already exists');
      return;
    }

    onChange([...skills, { name: newSkill.trim(), level: 0, category: SkillCategory.FRONTEND }]);
    setNewSkill('');
    setError('');
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    onChange(updatedSkills);
  };

  const handleSkillLevelChange = (index: number, level: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], level };
    onChange(updatedSkills);
  };

  const handleCategoryChange = (index: number, category: SkillCategory) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], category };
    onChange(updatedSkills);
  };

  // Group skills by category
  const categories = [SkillCategory.FRONTEND, SkillCategory.MOBILE, SkillCategory.BACKEND, SkillCategory.DATABASE, SkillCategory.TESTCASES];
  const categoryLabels: { [key in SkillCategory]: string } = {
    [SkillCategory.FRONTEND]: '🎨 Frontend',
    [SkillCategory.MOBILE]: '📱 Mobile',
    [SkillCategory.BACKEND]: '⚙️ Backend',
    [SkillCategory.DATABASE]: '🗄️ Database',
    [SkillCategory.TESTCASES]: '✅ Testing & QA',
    [SkillCategory.LANGUAGE]: 'Languages',
    [SkillCategory.SOFT]: 'Soft Skills',
    [SkillCategory.TECHNICAL]: 'Technical',
    [SkillCategory.TOOL]: 'Tools',
  };

  const groupedSkills = categories.map(cat => ({
    category: cat,
    label: categoryLabels[cat],
    skills: skills.filter(s => s.category === cat)
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Skills</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        Add skills and organize by category. Rate your proficiency level.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <View style={styles.addSkillContainer}>
            <TextInput
              style={[styles.input, error && styles.inputError, { fontFamily }]}
              value={newSkill}
              onChangeText={(value) => {
                setNewSkill(value);
                setError('');
              }}
              placeholder="Add new skill..."
              placeholderTextColor="#999"
              onSubmitEditing={handleAddSkill}
            />
            <TouchableOpacity
              style={[styles.addButton, !newSkill.trim() && styles.addButtonDisabled]}
              onPress={handleAddSkill}
              disabled={!newSkill.trim()}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {error && (
            <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
          )}
        </View>

        {/* Grouped Skills */}
        {groupedSkills.map(group => 
          group.skills.length > 0 && (
            <View key={group.category} style={styles.categoryGroup}>
              <Text style={[styles.categoryTitle, { fontFamily }]}>{group.label}</Text>
              <View style={styles.skillsList}>
                {group.skills.map((skill, index) => {
                  const globalIndex = skills.findIndex(s => s === skill);
                  return (
                    <View key={globalIndex} style={styles.skillItem}>
                      <View style={styles.skillInfo}>
                        <Text style={[styles.skillName, { fontFamily }]}>{skill.name}</Text>
                        <View style={styles.levelContainer}>
                          {[1, 2, 3, 4, 5].map((level) => (
                            <TouchableOpacity
                              key={level}
                              style={[
                                styles.levelDot,
                                skill.level >= level && styles.levelDotActive,
                              ]}
                              onPress={() => handleSkillLevelChange(globalIndex, level)}
                            />
                          ))}
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveSkill(globalIndex)}
                      >
                        <Ionicons name="close-circle" size={20} color="#FF3B30" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          )
        )}
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
    gap: SPACING.md,
  } as ViewStyle,
  inputGroup: {
    gap: SPACING.xs,
  } as ViewStyle,
  addSkillContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
  } as ViewStyle,
  input: {
    flex: 1,
    height: INPUT_HEIGHT.medium,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontSize: FONT_SIZE.body,
  } as TextStyle,
  inputError: {
    borderColor: '#FF3B30',
  } as TextStyle,
  addButton: {
    width: INPUT_HEIGHT.medium,
    height: INPUT_HEIGHT.medium,
    backgroundColor: '#007AFF',
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  addButtonDisabled: {
    backgroundColor: '#ccc',
  } as ViewStyle,
  errorText: {
    color: '#FF3B30',
    fontSize: FONT_SIZE.bodySmall,
  } as TextStyle,
  categoryGroup: {
    marginTop: SPACING.md,
  } as ViewStyle,
  categoryTitle: {
    fontSize: FONT_SIZE.h3,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: SPACING.sm,
  } as TextStyle,
  skillsList: {
    gap: SPACING.xs,
  } as ViewStyle,
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
  } as ViewStyle,
  skillInfo: {
    flex: 1,
    gap: SPACING.xs,
  } as ViewStyle,
  skillName: {
    fontSize: FONT_SIZE.bodySmall,
    fontWeight: '500',
  } as TextStyle,
  levelContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  } as ViewStyle,
  levelDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  } as ViewStyle,
  levelDotActive: {
    backgroundColor: '#007AFF',
  } as ViewStyle,
  removeButton: {
    padding: SPACING.xs,
  } as ViewStyle,
}); 