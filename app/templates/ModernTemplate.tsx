import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ResumeData } from '../store/resumeStore';
import { SkillCategory } from '../types/enums';
import { Education as EducationType, Language, Project, WorkExperience } from '../types/interfaces';

interface ModernTemplateProps {
  resumeData: ResumeData;
  previewMode?: boolean;
  fontSize?: number;
}

export default function ModernTemplate({ resumeData, previewMode = false, fontSize = 16 }: ModernTemplateProps) {
  const scale = previewMode ? 0.5 : 1;
  
  // Group skills by category
  const categories = [SkillCategory.FRONTEND, SkillCategory.MOBILE, SkillCategory.BACKEND, SkillCategory.DATABASE, SkillCategory.TESTCASES];
  const categoryLabels: { [key in SkillCategory]: string } = {
    [SkillCategory.FRONTEND]: 'Frontend',
    [SkillCategory.MOBILE]: 'Mobile', 
    [SkillCategory.BACKEND]: 'Backend',
    [SkillCategory.DATABASE]: 'Database',
    [SkillCategory.TESTCASES]: 'Testing',
    [SkillCategory.LANGUAGE]: 'Languages',
    [SkillCategory.SOFT]: 'Soft',
    [SkillCategory.TECHNICAL]: 'Technical',
    [SkillCategory.TOOL]: 'Tools',
  };

  const groupedSkills = categories.map(cat => ({
    category: cat,
    label: categoryLabels[cat],
    skills: resumeData.skills.filter(s => s.category === cat)
  })).filter(g => g.skills.length > 0);

  const contactLine = [
    resumeData.personalInfo.phone,
    resumeData.personalInfo.email,
    resumeData.personalInfo.location,
    resumeData.personalInfo.linkedin,
    resumeData.personalInfo.github,
    resumeData.personalInfo.website,
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <ScrollView 
      style={[styles.container, previewMode && { transform: [{ scale }], width: 360, height: 560, overflow: 'hidden' }]}
      showsVerticalScrollIndicator={!previewMode}
      bounces={!previewMode}
    >
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, { fontSize: fontSize + 18 }]}>{resumeData.personalInfo.fullName}</Text>
          <Text style={[styles.title, { fontSize: fontSize + 2 }]}>{resumeData.personalInfo.title}</Text>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactText, { fontSize: fontSize - 3 }]}>{contactLine}</Text>
            {resumeData.personalInfo.website && (
              <Text style={[styles.contactText, { fontSize: fontSize - 3 }]}>Website: {resumeData.personalInfo.website}</Text>
            )}
            {resumeData.personalInfo.linkedin && (
              <Text style={[styles.contactText, { fontSize: fontSize - 3 }]}>LinkedIn: {resumeData.personalInfo.linkedin}</Text>
            )}
            {resumeData.personalInfo.github && (
              <Text style={[styles.contactText, { fontSize: fontSize - 3 }]}>GitHub: {resumeData.personalInfo.github}</Text>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Professional Summary</Text>
            <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{resumeData.summary}</Text>
          </View>
        )}

        {/* Education */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Education</Text>
          {resumeData.education.map((edu: EducationType) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={[styles.itemTitle, { fontSize: fontSize - 1 }]}>{edu.degree}</Text>
                <Text style={[styles.itemMeta, { fontSize: fontSize - 3 }]}>{edu.location}</Text>
              </View>
              <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{edu.institution} | {edu.year}</Text>
            </View>
          ))}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Experience</Text>
          {resumeData.experiences.map((exp: WorkExperience) => (
            <View key={exp.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={[styles.itemTitle, { fontSize: fontSize - 1 }]}>{exp.position} @ {exp.company}</Text>
                <Text style={[styles.itemMeta, { fontSize: fontSize - 3 }]}>{exp.startDate} — {exp.endDate}</Text>
              </View>
              <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{exp.location}</Text>
              <View style={styles.bulletList}>
                {exp.achievements && exp.achievements.length > 0 ? (
                  exp.achievements.map((achievement, index) => (
                    <Text key={index} style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>
                      • {achievement}
                    </Text>
                  ))
                ) : (
                  <Text style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>
                    • {exp.description}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Projects */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Projects</Text>
          {resumeData.projects.map((project: Project) => (
            <View key={project.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={[styles.itemTitle, { fontSize: fontSize - 1 }]}>{project.name}</Text>
                <Text style={[styles.itemMeta, { fontSize: fontSize - 3 }]}>{project.duration || ''}</Text>
              </View>
              {project.role && (
                <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{project.role}</Text>
              )}
              <View style={styles.bulletList}>
                <Text style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>
                  • {project.description}
                </Text>
              </View>
              {project.technologies && project.technologies.length > 0 && (
                <View style={styles.tagsContainer}>
                  {project.technologies.map((tech, index) => (
                    <Text key={index} style={[styles.tag, { fontSize: fontSize - 4 }]}>
                      {tech}
                    </Text>
                  ))}
                </View>
              )}
              {project.link && (
                <Text style={[styles.link, { fontSize: fontSize - 2 }]}>App Link: {project.link}</Text>
              )}
            </View>
          ))}
        </View>

        {/* Certifications */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Certifications / Achievements</Text>
            <View style={styles.bulletList}>
              {resumeData.certifications.map((cert, index) => (
                <Text key={index} style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>
                  • {cert.name} — {cert.issuer} ({cert.date}){cert.link ? `, Link: ${cert.link}` : ''}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Technical Skills */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Technical Skills</Text>
          {groupedSkills.map(group => (
            <View key={group.category} style={styles.skillGroup}>
              <Text style={[styles.skillLabel, { fontSize: fontSize - 1 }]}>{group.label}</Text>
              <Text style={[styles.skillText, { fontSize: fontSize - 2 }]}>
                {group.skills.map(s => s.name).join(', ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Languages */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Languages</Text>
            <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>
              {resumeData.languages.map((l: Language) => `${l.name} (${l.proficiency})`).join(', ')}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    maxWidth: 800,
  },
  header: {
    marginBottom: 22,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
    alignItems: 'center',
  },
  name: {
    fontSize: 34,
    marginBottom: 4,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  contactInfo: {
    marginTop: 8,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: 18,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.08,
    color: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 6,
  },
  item: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    flex: 1,
  },
  itemMeta: {
    fontSize: 12,
    color: '#555',
    marginLeft: 12,
  },
  bodyText: {
    fontSize: 13,
    color: '#222',
    marginBottom: 6,
    lineHeight: 20,
  },
  bulletList: {
    marginTop: 8,
    paddingLeft: 18,
  },
  bulletItem: {
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  tag: {
    backgroundColor: '#f3f3f3',
    color: '#333',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 4,
  },
  link: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 8,
  },
  skillGroup: {
    marginBottom: 10,
  },
  skillLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  skillText: {
    fontSize: 13,
    color: '#222',
    lineHeight: 20,
  },
}); 