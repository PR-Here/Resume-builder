import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ResumeData } from '../store/resumeStore';
import { SkillCategory } from '../types/enums';
import { Education as EducationType, Language, Project, WorkExperience } from '../types/interfaces';

interface ClassicTemplateProps {
  resumeData: ResumeData;
  previewMode?: boolean;
  fontSize?: number;
}

export default function ClassicTemplate({ resumeData, previewMode = false, fontSize = 18 }: ClassicTemplateProps) {
  const scale = previewMode ? 0.5 : 1;

  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

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
  ]
    .filter(Boolean)
    .join(' | ');

  return (
    <ScrollView 
      style={[styles.container, previewMode && { transform: [{ scale }], width: 720, height: 980, overflow: 'hidden' }]}
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
            {/* Clickable Links */}
            <View style={styles.headerLinks}>
              {resumeData.personalInfo.linkedin && (
                <TouchableOpacity onPress={() => Linking.openURL(formatUrl(resumeData.personalInfo.linkedin))}>
                  <Text style={[styles.headerLink, { fontSize: fontSize - 3 }]}>LinkedIn</Text>
                </TouchableOpacity>
              )}
              {resumeData.personalInfo.github && (
                <TouchableOpacity onPress={() => Linking.openURL(formatUrl(resumeData.personalInfo.github))}>
                  <Text style={[styles.headerLink, { fontSize: fontSize - 3 }]}>GitHub</Text>
                </TouchableOpacity>
              )}
              {resumeData.personalInfo.website && (
                <TouchableOpacity onPress={() => Linking.openURL(formatUrl(resumeData.personalInfo.website))}>
                  <Text style={[styles.headerLink, { fontSize: fontSize - 3 }]}>Portfolio</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Professional Summary */}
        {resumeData.summary && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Professional Summary</Text>
            <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{resumeData.summary}</Text>
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

        {/* Education */}
          <View style={styles.section}>
          <Text style={[styles.sectionTitle, { fontSize: fontSize + 2 }]}>Education</Text>
          {resumeData.education.map((edu: EducationType) => (
            <View key={edu.id} style={styles.item}>
              <View style={styles.itemHeader}>
                <Text style={[styles.itemTitle, { fontSize: fontSize - 1 }]}>{edu.institution}</Text>
                <Text style={[styles.itemMeta, { fontSize: fontSize - 3 }]}>{edu.location}</Text>
              </View>
              <View style={[styles.itemHeader, styles.smallMargin]}> 
                <Text style={[styles.bodyText, {fontSize: fontSize - 2}]}>{edu.degree}</Text>
                <Text style={[styles.itemMeta, { fontSize: fontSize - 3 }]}>{edu.year}</Text>
              </View>
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
              {project.role ? (
                <Text style={[styles.bodyText, { fontSize: fontSize - 2 }]}>{project.role}</Text>
              ) : null}
              <View style={styles.bulletList}>
                <Text style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>{`• ${project.description}`}</Text>
              </View>
              {project.technologies && project.technologies.length > 0 && (
                <Text style={[styles.projectTech, { fontSize: fontSize - 3 }]}>Technologies: {project.technologies.join(', ')}</Text>
              )}
              {project.link && (
                <Text
                  style={[styles.link, { fontSize: fontSize - 2 }]}
                  onPress={() => Linking.openURL(formatUrl(project.link))}
                >
                  App Link: {project.link}
                </Text>
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
                <View key={index}>
                  <Text style={[styles.bulletItem, { fontSize: fontSize - 2 }]}>
                    • {cert.name}
                  </Text>
                  {cert.link && (
                    <TouchableOpacity onPress={() => Linking.openURL(formatUrl(cert.link))}>
                      <Text style={[styles.link, { fontSize: fontSize - 2 }]}>{cert.link}</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={[styles.bodyText, { fontSize: fontSize - 3, marginTop: 2 }]}>{cert.issuer} • {cert.date}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

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
    padding: 20,
    maxWidth: 760,
  },
  header: {
    marginBottom: 18,
    paddingBottom: 10,
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
    marginTop: 4,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2,
    textAlign: 'center',
    lineHeight: 16,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.12,
    color: '#111',
    borderBottomWidth: 1,
    borderBottomColor: '#111',
    paddingBottom: 6,
  },
  item: {
    marginBottom: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  smallMargin: {
    marginTop: 4,
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
    marginLeft: 8,
    textAlign: 'right',
    flexShrink: 0,
  },
  bodyText: {
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
    lineHeight: 20,
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: 16,
  },
  bulletItem: {
    fontSize: 13,
    color: '#222',
    marginBottom: 4,
  },
  projectTech: {
    fontSize: 12,
    color: '#333',
    marginTop: 6,
    fontStyle: 'italic',
  },
  link: {
    fontSize: 12,
    color: '#0066cc',
    marginTop: 4,
  },
  skillGroup: {
    marginBottom: 10,
  },
  skillLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  skillText: {
    fontSize: 13,
    color: '#222',
    lineHeight: 20,
  },
  headerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 6,
  },
  headerLink: {
    color: '#0066cc',
    fontWeight: '500',
  }
}); 