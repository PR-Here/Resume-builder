import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { isEmpty, map, isNil } from 'lodash';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { CertificationsFormProps } from '../types/interfaces';
import Text from './Text';
import DateInput from './DateInput';
import { validateField, validateDateRange, validateUrl } from '../utils/validationUtils';

export default function CertificationsForm({ certifications, onChange, fontFamily }: CertificationsFormProps) {
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  const handleUpdateCertification = (id: string, field: string, value: any) => {
    const updatedCertifications = map(certifications, certification => {
      if (certification.id === id) {
        const updatedCertification = { ...certification, [field]: value };
        
        // Validate date range if dates are being updated
        if (field === 'issueDate' || field === 'expiryDate' || field === 'neverExpires') {
          const dateError = validateDateRange(
            updatedCertification.issueDate,
            updatedCertification.expiryDate,
            updatedCertification.neverExpires
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

        // Validate URL fields
        if (field === 'credentialUrl') {
          const urlError = validateUrl(value, 'credential');
          if (urlError) {
            setErrors(prev => ({
              ...prev,
              [id]: { ...prev[id], credentialUrl: urlError.message }
            }));
          } else {
            setErrors(prev => {
              const newErrors = { ...prev };
              if (newErrors[id]) {
                delete newErrors[id].credentialUrl;
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

        return updatedCertification;
      }
      return certification;
    });
    onChange(updatedCertifications);
  };

  const handleAddCertification = () => {
    const newCertification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
      neverExpires: false,
    };
    onChange([...certifications, newCertification]);
  };

  const handleRemoveCertification = (id: string) => {
    onChange(certifications.filter(certification => certification.id !== id));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Certifications</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        List your professional certifications and licenses. Include the issuing organization and relevant dates.
      </Text>

      {map(certifications, (certification, index) => (
        <View key={certification.id} style={styles.certificationCard}>
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { fontFamily }]}>
              Certification {index + 1}
            </Text>
            <TouchableOpacity
              onPress={() => handleRemoveCertification(certification.id)}
              style={styles.removeButton}
            >
              <Ionicons name="close-circle" size={24} color="#FF3B30" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Certification Name</Text>
              <TextInput
                style={[styles.input, !isNil(errors[certification.id]?.name) && styles.inputError, { fontFamily }]}
                value={certification.name}
                onChangeText={(value) => handleUpdateCertification(certification.id, 'name', value)}
                placeholder="e.g., AWS Certified Solutions Architect"
                placeholderTextColor="#999"
              />
              {!isNil(errors[certification.id]?.name) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[certification.id].name}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Issuing Organization</Text>
              <TextInput
                style={[styles.input, !isNil(errors[certification.id]?.issuer) && styles.inputError, { fontFamily }]}
                value={certification.issuer}
                onChangeText={(value) => handleUpdateCertification(certification.id, 'issuer', value)}
                placeholder="e.g., Amazon Web Services"
                placeholderTextColor="#999"
              />
              {!isNil(errors[certification.id]?.issuer) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[certification.id].issuer}</Text>
              )}
            </View>

            <View style={styles.dateContainer}>
              <View style={styles.dateInput}>
                <Text style={[styles.label, { fontFamily }]}>Issue Date</Text>
                <DateInput
                  value={certification.issueDate}
                  onChange={(value) => handleUpdateCertification(certification.id, 'issueDate', value)}
                  fontFamily={fontFamily}
                />
              </View>

              <View style={styles.dateInput}>
                <Text style={[styles.label, { fontFamily }]}>Expiry Date</Text>
                <DateInput
                  value={certification.expiryDate}
                  onChange={(value) => handleUpdateCertification(certification.id, 'expiryDate', value)}
                  fontFamily={fontFamily}
                  placeholder={certification.neverExpires ? 'Never Expires' : 'MM/YYYY'}
                />
              </View>
            </View>

            {!isNil(errors[certification.id]?.date) && (
              <Text style={[styles.errorText, { fontFamily }]}>{errors[certification.id].date}</Text>
            )}

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, certification.neverExpires && styles.checkboxChecked]}
                onPress={() => handleUpdateCertification(certification.id, 'neverExpires', !certification.neverExpires)}
              >
                {certification.neverExpires && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={[styles.checkboxLabel, { fontFamily }]}>Never Expires</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Credential ID</Text>
              <TextInput
                style={[styles.input, !isNil(errors[certification.id]?.credentialId) && styles.inputError, { fontFamily }]}
                value={certification.credentialId}
                onChangeText={(value) => handleUpdateCertification(certification.id, 'credentialId', value)}
                placeholder="e.g., AWS-123456"
                placeholderTextColor="#999"
              />
              {!isNil(errors[certification.id]?.credentialId) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[certification.id].credentialId}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Credential URL</Text>
              <TextInput
                style={[styles.input, !isNil(errors[certification.id]?.credentialUrl) && styles.inputError, { fontFamily }]}
                value={certification.credentialUrl}
                onChangeText={(value) => handleUpdateCertification(certification.id, 'credentialUrl', value)}
                placeholder="e.g., https://credential.net/verify/123456"
                placeholderTextColor="#999"
                keyboardType="url"
                autoCapitalize="none"
              />
              {!isNil(errors[certification.id]?.credentialUrl) && (
                <Text style={[styles.errorText, { fontFamily }]}>{errors[certification.id].credentialUrl}</Text>
              )}
            </View>
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAddCertification}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={[styles.addButtonText, { fontFamily }]}>Add Certification</Text>
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
  certificationCard: {
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