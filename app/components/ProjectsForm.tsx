import React, { useState } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { FONT_SIZE, SPACING, BORDER_RADIUS, INPUT_HEIGHT } from '../styles/responsive';
import { ProjectsFormProps } from '../types/interfaces';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { validateField } from '../utils/validationUtils';

export default function ProjectsForm({ projects, onChange, fontFamily }: ProjectsFormProps) {
  const [error, setError] = useState<string>('');

  const handleAddProject = () => {
    const newProject = {
      name: '',
      description: '',
      technologies: [''],
      startDate: '',
      endDate: '',
      current: false,
      url: '',
    };
    onChange([...projects, newProject]);
  };

  const handleRemoveProject = (index: number) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
  };

  const handleProjectChange = (index: number, field: string, value: string | boolean | string[]) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    onChange(updatedProjects);
  };

  const handleAddTechnology = (projectIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.push('');
    onChange(updatedProjects);
  };

  const handleRemoveTechnology = (projectIndex: number, technologyIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.splice(technologyIndex, 1);
    onChange(updatedProjects);
  };

  const handleTechnologyChange = (projectIndex: number, technologyIndex: number, value: string) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies[technologyIndex] = value;
    onChange(updatedProjects);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.sectionTitle, { fontFamily }]}>Projects</Text>
      <Text style={[styles.sectionDescription, { fontFamily }]}>
        Showcase your projects and demonstrate your technical skills. Include both personal and professional projects.
      </Text>

      <View style={styles.form}>
        {projects.map((project, index) => (
          <View key={index} style={styles.projectCard}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { fontFamily }]}>Project {index + 1}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveProject(index)}
              >
                <Ionicons name="close-circle" size={24} color="#FF3B30" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Project Name</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={project.name}
                onChangeText={(value) => handleProjectChange(index, 'name', value)}
                placeholder="e.g., E-commerce Platform"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Description</Text>
              <TextInput
                style={[styles.textArea, { fontFamily }]}
                value={project.description}
                onChangeText={(value) => handleProjectChange(index, 'description', value)}
                placeholder="Describe the project, your role, and key features..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.technologiesContainer}>
              <Text style={[styles.label, { fontFamily }]}>Technologies Used</Text>
              {project.technologies.map((technology, technologyIndex) => (
                <View key={technologyIndex} style={styles.technologyItem}>
                  <TextInput
                    style={[styles.input, { fontFamily }]}
                    value={technology}
                    onChangeText={(value) => handleTechnologyChange(index, technologyIndex, value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                    placeholderTextColor="#999"
                  />
                  <TouchableOpacity
                    style={styles.removeTechnologyButton}
                    onPress={() => handleRemoveTechnology(index, technologyIndex)}
                  >
                    <Ionicons name="close-circle" size={20} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                style={styles.addTechnologyButton}
                onPress={() => handleAddTechnology(index)}
              >
                <Ionicons name="add-circle" size={20} color="#007AFF" />
                <Text style={[styles.addTechnologyText, { fontFamily }]}>Add Technology</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={[styles.label, { fontFamily }]}>Start Date</Text>
                <TextInput
                  style={[styles.input, { fontFamily }]}
                  value={project.startDate}
                  onChangeText={(value) => handleProjectChange(index, 'startDate', value)}
                  placeholder="e.g., Jan 2023"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={[styles.label, { fontFamily }]}>End Date</Text>
                <TextInput
                  style={[styles.input, { fontFamily }]}
                  value={project.endDate}
                  onChangeText={(value) => handleProjectChange(index, 'endDate', value)}
                  placeholder="e.g., Present"
                  placeholderTextColor="#999"
                  editable={!project.current}
                />
              </View>
            </View>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => handleProjectChange(index, 'current', !project.current)}
              >
                {project.current && (
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                )}
              </TouchableOpacity>
              <Text style={[styles.checkboxLabel, { fontFamily }]}>Currently working on this project</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { fontFamily }]}>Project URL</Text>
              <TextInput
                style={[styles.input, { fontFamily }]}
                value={project.url}
                onChangeText={(value) => handleProjectChange(index, 'url', value)}
                placeholder="e.g., https://github.com/username/project"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddProject}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={[styles.addButtonText, { fontFamily }]}>Add Project</Text>
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
  projectCard: {
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
  technologiesContainer: {
    gap: SPACING.sm,
  } as ViewStyle,
  technologyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  } as ViewStyle,
  removeTechnologyButton: {
    padding: SPACING.xs,
  } as ViewStyle,
  addTechnologyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    paddingVertical: SPACING.sm,
  } as ViewStyle,
  addTechnologyText: {
    fontSize: FONT_SIZE.body,
    color: '#007AFF',
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
}); 