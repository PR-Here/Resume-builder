import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FONT_SIZE, SPACING, BORDER_RADIUS, SHADOW, CARD } from './styles/responsive';
import { useFont } from './hooks/useFont';

export default function HomeScreen() {
  const { fontFamily } = useFont();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { fontFamily }]}>Resume Builder</Text>
          <Text style={[styles.subtitle, { fontFamily }]}>Create a professional resume in minutes</Text>
        </View>

        <View style={styles.actions}>
          <Link href="/resume-builder" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Ionicons name="add-circle-outline" size={24} color="#fff" />
              <Text style={[styles.buttonText, { fontFamily }]}>Create New Resume</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="folder-outline" size={24} color="#007AFF" />
            <Text style={[styles.buttonText, styles.secondaryButtonText, { fontFamily }]}>
              Open Existing Resume
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.features}>
          <Text style={[styles.sectionTitle, { fontFamily }]}>Features</Text>
          
          <View style={styles.featureGrid}>
            <View style={styles.featureCard}>
              <Ionicons name="document-text-outline" size={32} color="#007AFF" />
              <Text style={[styles.featureTitle, { fontFamily }]}>Professional Templates</Text>
              <Text style={[styles.featureDescription, { fontFamily }]}>
                Choose from multiple professional templates
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="color-palette-outline" size={32} color="#007AFF" />
              <Text style={[styles.featureTitle, { fontFamily }]}>Customizable</Text>
              <Text style={[styles.featureDescription, { fontFamily }]}>
                Customize colors, fonts, and layout
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="download-outline" size={32} color="#007AFF" />
              <Text style={[styles.featureTitle, { fontFamily }]}>Export Options</Text>
              <Text style={[styles.featureDescription, { fontFamily }]}>
                Export as PDF, DOCX, or TXT
              </Text>
            </View>

            <View style={styles.featureCard}>
              <Ionicons name="cloud-upload-outline" size={32} color="#007AFF" />
              <Text style={[styles.featureTitle, { fontFamily }]}>Cloud Sync</Text>
              <Text style={[styles.featureDescription, { fontFamily }]}>
                Save and access your resumes anywhere
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZE.h1,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZE.bodyLarge,
    color: '#666',
  },
  actions: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  actionRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  actionButton: {
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    ...SHADOW.small,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: '#007AFF',
    ...SHADOW.small,
  },
  buttonText: {
    color: '#fff',
    fontSize: FONT_SIZE.button,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  features: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.h3,
    fontWeight: '600',
    color: '#333',
    marginBottom: SPACING.lg,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    flex: 1,
    minWidth: CARD.maxWidth / 2 - SPACING.md,
    alignItems: 'center',
    ...SHADOW.small,
  },
  featureTitle: {
    fontSize: FONT_SIZE.h5,
    fontWeight: '600',
    color: '#333',
    marginTop: SPACING.sm,
    marginBottom: SPACING.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: FONT_SIZE.bodySmall,
    color: '#666',
    textAlign: 'center',
  },
});
