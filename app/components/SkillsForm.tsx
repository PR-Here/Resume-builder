import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { SkillsFormProps } from '../types/interfaces';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { validateField } from '../utils/validationUtils';

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

    onChange([...skills, { name: newSkill.trim(), level: 0 }]);
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

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Skills</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        Add your technical and professional skills. You can rate your proficiency level for each skill.
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
              placeholder="e.g., JavaScript,  UI/UX Design"
              placeholderTextColor="#999"
              onSubmitEditing={handleAddSkill}
            />
            <TouchableOpacity
              style={[styles.addButton, !newSkill.trim() && styles.addButtonDisabled]}
              onPress={handleAddSkill}
              disabled={!newSkill.trim()}
            >
              <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {error && (
            <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
          )}
        </View>

        <View style={styles.skillsList}>
          {skills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
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
                      onPress={() => handleSkillLevelChange(index, level)}
                    />
                  ))}
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveSkill(index)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  skillsList: {
    gap: SPACING.sm,
  } as ViewStyle,
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f9fa',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  } as ViewStyle,
  skillInfo: {
    flex: 1,
    gap: SPACING.xs,
  } as ViewStyle,
  skillName: {
    fontSize: FONT_SIZE.body,
    fontWeight: '500',
  } as TextStyle,
  levelContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
  } as ViewStyle,
  levelDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
  } as ViewStyle,
  levelDotActive: {
    backgroundColor: '#007AFF',
  } as ViewStyle,
  removeButton: {
    padding: SPACING.xs,
  } as ViewStyle,
}); 