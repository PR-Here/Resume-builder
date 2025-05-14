import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { ProfessionalSummaryFormProps } from '../types/interfaces';
import Text from './Text';
import { validateField } from '../utils/validationUtils';

export default function ProfessionalSummaryForm({ summary, onChange, fontFamily }: ProfessionalSummaryFormProps) {
  const [error, setError] = useState<string>('');

  const handleChange = (value: string) => {
    const validationResult = validateField('summary', value);
    const errorMessage = validationResult ? validationResult.message : '';
    setError(errorMessage);
    onChange(value);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Professional Summary</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        Write a compelling summary that highlights your key strengths and career objectives.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <TextInput
            style={[styles.input, error && styles.inputError, { fontFamily }]}
            value={summary}
            onChangeText={handleChange}
            placeholder="e.g., Experienced software developer with a passion for creating efficient and scalable solutions..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          {error && (
            <Text style={[styles.errorText, { fontFamily }]}>{error}</Text>
          )}
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
  input: {
    minHeight: INPUT_HEIGHT.large * 2,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    fontSize: FONT_SIZE.body,
  } as TextStyle,
  inputError: {
    borderColor: '#FF3B30',
  } as TextStyle,
  errorText: {
    color: '#FF3B30',
    fontSize: FONT_SIZE.bodySmall,
  } as TextStyle,
}); 