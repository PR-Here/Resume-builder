import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { PersonalInfoFormProps } from '../types/interfaces';
import Text from './Text';
import { validateField } from '../utils/validationUtils';

export default function PersonalInfoForm({ personalInfo, onChange, fontFamily }: PersonalInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: string) => {
    const validationResult = validateField(field, value);
    const errorMessage = validationResult ? validationResult.message : '';
    
    setErrors(prev => ({
      ...prev,
      [field]: errorMessage,
    }));

    onChange({
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Personal Information</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        Fill in your personal details. This information will be displayed at the top of your resume.
      </Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.fullName && styles.inputError, { fontFamily }]}
            value={personalInfo.fullName}
            onChangeText={(value) => handleFieldChange('fullName', value)}
            placeholder="e.g., John Doe"
            placeholderTextColor="#999"
          />
          {errors.fullName && (
            <Text style={[styles.errorText, { fontFamily }]}>{errors.fullName}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Professional Title</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError, { fontFamily }]}
            value={personalInfo.title}
            onChangeText={(value) => handleFieldChange('title', value)}
            placeholder="e.g., Senior Software Developer"
            placeholderTextColor="#999"
          />
          {errors.title && (
            <Text style={[styles.errorText, { fontFamily }]}>{errors.title}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError, { fontFamily }]}
            value={personalInfo.email}
            onChangeText={(value) => handleFieldChange('email', value)}
            placeholder="e.g., john.doe@example.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={[styles.errorText, { fontFamily }]}>{errors.email}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Phone</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError, { fontFamily }]}
            value={personalInfo.phone}
            onChangeText={(value) => handleFieldChange('phone', value)}
            placeholder="e.g., +1 (555) 123-4567"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
          {errors.phone && (
            <Text style={[styles.errorText, { fontFamily }]}>{errors.phone}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Location</Text>
          <TextInput
            style={[styles.input, errors.location && styles.inputError, { fontFamily }]}
            value={personalInfo.location}
            onChangeText={(value) => handleFieldChange('location', value)}
            placeholder="e.g., New York, NY"
            placeholderTextColor="#999"
          />
          {errors.location && (
            <Text style={[styles.errorText, { fontFamily }]}>{errors.location}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>Website</Text>
          <TextInput
            style={[styles.input, { fontFamily }]}
            value={personalInfo.website}
            onChangeText={(value) => handleFieldChange('website', value)}
            placeholder="e.g., https://johndoe.com"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>LinkedIn</Text>
          <TextInput
            style={[styles.input, { fontFamily }]}
            value={personalInfo.linkedin}
            onChangeText={(value) => handleFieldChange('linkedin', value)}
            placeholder="e.g., https://linkedin.com/in/johndoe"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { fontFamily }]}>GitHub</Text>
          <TextInput
            style={[styles.input, { fontFamily }]}
            value={personalInfo.github}
            onChangeText={(value) => handleFieldChange('github', value)}
            placeholder="e.g., https://github.com/johndoe"
            placeholderTextColor="#999"
            autoCapitalize="none"
          />
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
  inputError: {
    borderColor: '#FF3B30',
  } as TextStyle,
  errorText: {
    color: '#FF3B30',
    fontSize: FONT_SIZE.bodySmall,
  } as TextStyle,
}); 