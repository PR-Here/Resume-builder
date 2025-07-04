import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ResumeData } from '../context/ResumeContext';
import { Education as EducationType, Language, Project, Skill, WorkExperience } from '../types/interfaces';

interface ModernTemplateProps {
  resumeData: ResumeData;
  previewMode?: boolean;
  fontSize?: number;
}

function splitInTwo<T>(arr: T[]): [T[], T[]] {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

export default function ModernTemplate({ resumeData, previewMode = false, fontSize = 16 }: ModernTemplateProps) {
  const scale = previewMode ? 0.5 : 1;
  const [skillsCol1, skillsCol2] = splitInTwo(resumeData.skills);
  return (
    <View style={[styles.container, previewMode && { transform: [{ scale }], width: 350, height: 500, overflow: 'hidden' }]}> 
      <Text style={[styles.name, { fontSize: fontSize + 16 }]} numberOfLines={1} ellipsizeMode="tail">{resumeData.personalInfo.fullName}</Text>
      <Text style={[styles.title, { fontSize: fontSize + 2 }]} numberOfLines={1} ellipsizeMode="tail">{resumeData.personalInfo.title}</Text>
      <Text style={styles.section}>Summary</Text>
      <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{resumeData.summary}</Text>
      <Text style={styles.section}>Skills</Text>
      <View style={styles.skillListRow}>
        <View style={styles.skillCol}>
          {skillsCol1.map((s: Skill) => (
            <View key={s.id} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.text, { fontSize: fontSize - 2 }]}>{s.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.skillCol}>
          {skillsCol2.map((s: Skill) => (
            <View key={s.id} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={[styles.text, { fontSize: fontSize - 2 }]}>{s.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.section}>Experience</Text>
      {resumeData.experiences.map((exp: WorkExperience) => (
        <View key={exp.id} style={styles.item}>
          <Text style={[styles.itemTitle, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{exp.position} @ {exp.company}</Text>
          <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{exp.startDate} - {exp.endDate} | {exp.location}</Text>
          <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{exp.description}</Text>
        </View>
      ))}
      <Text style={styles.section}>Projects</Text>
      {resumeData.projects.map((project: Project) => {
        const [techCol1, techCol2] = splitInTwo(project.technologies);
        return (
          <View key={project.id} style={styles.item}>
            <Text style={[styles.itemTitle, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{project.name}</Text>
            <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">Description: {project.description}</Text>
            <View style={styles.skillListRow}>
              <View style={styles.skillCol}>
                {techCol1.map((technology: string) => (
                  <View key={technology} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.text, { fontSize: fontSize - 2 }]}>{technology}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.skillCol}>
                {techCol2.map((technology: string) => (
                  <View key={technology} style={styles.bulletRow}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={[styles.text, { fontSize: fontSize - 2 }]}>{technology}</Text>
                  </View>
                ))}
              </View>
            </View>
            <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">App Link: {project.link}</Text>
          </View>
        );
      })}
      <Text style={styles.section}>Education</Text>
      {resumeData.education.map((edu: EducationType) => (
        <View key={edu.id} style={styles.item}>
          <Text style={[styles.itemTitle, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{edu.degree} - {edu.institution}</Text>
          <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{edu.year} | {edu.location}</Text>
        </View>
      ))}
      <Text style={styles.section}>Languages</Text>
      <Text style={[styles.text, { fontSize: fontSize - 2 }]}  ellipsizeMode="tail">{resumeData.languages.map((l: Language) => l.name + ' (' + l.proficiency + ')').join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '100%',
    maxWidth: 700,
    minHeight: 0,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },
  title: {
    fontSize: 18,
    color: '#007AFF',
    marginBottom: 12,
  },
  section: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    color: '#5856D6',
  },
  text: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  item: {
    marginBottom: 8,
  },
  itemTitle: {
    fontWeight: '600',
    fontSize: 15,
    color: '#222',
  },
  skillListRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  skillCol: {
    flex: 1,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    fontSize: 14,
    color: '#007AFF',
    marginRight: 6,
  },
}); 