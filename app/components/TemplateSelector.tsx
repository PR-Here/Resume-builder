import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

interface Template {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
}

export default function TemplateSelector({ templates, selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Template</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={[
              styles.templateCard,
              selectedTemplate === template.id && styles.selectedTemplate,
            ]}
            onPress={() => onSelectTemplate(template.id)}
          >
            <View style={styles.thumbnailContainer}>
              <Image
                source={{ uri: template.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.templateName}>{template.name}</Text>
            <Text style={styles.templateDescription}>{template.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  scrollView: {
    flexDirection: 'row',
  },
  templateCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedTemplate: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  thumbnailContainer: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  templateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
}); 