import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { LanguagesFormProps } from '../types/interfaces';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { validateField } from '../utils/validationUtils';

export default function LanguagesForm({ languages, onChange, fontFamily }: LanguagesFormProps) {
  const [error, setError] = useState<string>('');

  const handleAddLanguage = () => {
    const newLanguage = {
      name: '',
      level: '',
    };
    onChange([...languages, newLanguage]);
  };

  const handleRemoveLanguage = (index: number) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    onChange(updatedLanguages);
  };

  const handleLanguageChange = (index: number, field: string, value: string) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value,
    };
    onChange(updatedLanguages);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Languages</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        List the languages you speak and your proficiency level in each.
      </Text>

      <View style={styles.form}>
        {languages.map((language, index) => (
          <View key={index} style={styles.languageCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { fontFamily }]}>Language {index + 1}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveLanguage(index)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Language</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={language.name}
                onChangeText={(value) => handleLanguageChange(index, 'name', value)}
                placeholder="e.g., English, Spanish, French"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Proficiency Level</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={language.level}
                onChangeText={(value) => handleLanguageChange(index, 'level', value)}
                placeholder="e.g., Native, Fluent, Intermediate"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddLanguage}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={[styles.addButtonText, { fontFamily }]}>Add Language</Text>
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
  languageCard: {
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
}); 