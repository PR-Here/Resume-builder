import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomModal from "../components/CustomModal";
import CustomText from "../components/Text";
import ClassicTemplate from "../templates/ClassicTemplate";
import { TemplateId } from "../store/resumeStore";

interface ExportModalProps {
  resumeData: any;
  isOpen: boolean;
  onClose: () => void;
  SelectedTemplateComponent?: React.ComponentType<{
    resumeData: any;
    previewMode: boolean;
    fontSize: number;
  }>;
}

export default function ExportModal({
  isOpen,
  onClose,
  resumeData,
  SelectedTemplateComponent,
}: ExportModalProps) {
  const [showPreview, setShowPreview] = React.useState(true);
  const PreviewTemplate = SelectedTemplateComponent || ClassicTemplate;
  // Helper function to format URLs properly
  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const escapeHtml = (text: string) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const generateHTML = (template: TemplateId) => {
    const { personalInfo, summary, skills, experiences, education, projects, certifications, languages } = resumeData;
    const categories = ['frontend', 'mobile', 'backend', 'database', 'testcases'];

    const shortenText = (text: string, maxLength = 90) => {
      if (!text) return '';
      const trimmed = text.trim();
      if (trimmed.length <= maxLength) return trimmed;
      return `${trimmed.slice(0, maxLength - 3).replace(/\s+\S*$/, '')}...`;
    };
    const categoryLabels: { [key: string]: string } = {
      frontend: 'Frontend',
      mobile: 'Mobile',
      backend: 'Backend',
      database: 'Database',
      testcases: 'Testing',
    };

    const groupedSkills = categories
      .map((cat) => ({
        category: cat,
        label: categoryLabels[cat],
        items: skills.filter((s: any) => s.category === cat),
      }))
      .filter((g) => g.items.length > 0);

    const contactLine = [
      personalInfo.phone ? escapeHtml(personalInfo.phone) : null,
      personalInfo.email ? escapeHtml(personalInfo.email) : null,
      personalInfo.location ? escapeHtml(personalInfo.location) : null,
    ]
      .filter(Boolean)
      .join(' | ');

    const languageLine = languages.map((lang: any) => `${escapeHtml(lang.name)} (${escapeHtml(lang.proficiency)})`).join(', ');

    const classicStyles = `
      html, body {
        width: 210mm;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'EB Garamond', Georgia, serif;
        color: #111;
        background-color: #fff;
      }
      body {
        line-height: 1.18;
        font-size: 10px;
        max-width: 210mm;
        margin: 0;
        padding: 4mm 6mm 4mm;
      }
      @page {
        size: A4 portrait;
        margin: 4mm;
      }
      .header {
        text-align: center;
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 1px solid #111;
      }
      .name {
        font-size: 29px;
        margin: 0 0 3px 0;
        font-weight: 700;
        letter-spacing: 0.02em;
      }
      .title {
        font-size: 11.5px;
        margin: 0 0 4px 0;
        color: #222;
        font-weight: 600;
      }
      .personal-info {
        margin-top: 3px;
      }
      .personal-text {
        margin: 0;
        font-size: 10px;
        color: #333;
        line-height: 1.22;
        word-wrap: break-word;
      }
      .section {
        margin-top: 8px;
      }
      .section-title {
        font-size: 10.5px;
        margin: 0 0 4px 0;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #111;
        border-bottom: 1px solid #111;
        padding-bottom: 2px;
      }
      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 6px;
        flex-wrap: wrap;
        margin-bottom: 2px;
      }
      .item-title {
        margin: 0;
        font-size: 11.5px;
        font-weight: 700;
        color: #111;
      }
      .item-meta {
        margin: 0;
        font-size: 9.5px;
        color: #555;
        min-width: 90px;
        text-align: right;
      }
      .body-text {
        margin: 0;
        font-size: 10px;
        color: #222;
        line-height: 1.22;
      }
      .bullet-list {
        margin: 3px 0 0 0;
        padding-left: 12px;
      }
      .bullet-list li {
        margin-bottom: 2px;
        font-size: 10px;
        line-height: 1.22;
      }
      .skill-group {
        margin-bottom: 6px;
      }
      .skill-label {
        margin: 0 0 2px 0;
        font-size: 10.5px;
        font-weight: 700;
        color: #111;
      }
      .skill-text {
        margin: 0;
        font-size: 10px;
        color: #222;
        line-height: 1.25;
      }
      .link {
        color: #0066cc;
        text-decoration: none;
        font-weight: 500;
      }
      .link:hover {
        text-decoration: underline;
      }
      .portfolio-links {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .portfolio-links li {
        margin-bottom: 3px;
        font-size: 10px;
        line-height: 1.22;
      }
      .item {
        margin-bottom: 6px;
      }
      .project-tech {
        margin-top: 3px;
        font-size: 10px;
        color: #333;
        font-style: italic;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
        .section,
        .item {
          page-break-inside: avoid;
        }
      }
    `;

    const modernStyles = classicStyles;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(personalInfo.fullName)} - Resume</title>
        <style>${template === 'classic' ? classicStyles : modernStyles}</style>
      </head>
      <body>
        <div class="header">
          <p class="name">${escapeHtml(personalInfo.fullName)}</p>
          <p class="title">${escapeHtml(personalInfo.title)}</p>
          <div class="personal-info">
            <p class="personal-text">${escapeHtml(contactLine)}</p>
            <!-- Header Links -->
            ${personalInfo.linkedin ? `<p class="personal-text"><a class="link" href="${formatUrl(personalInfo.linkedin)}" target="_blank">LinkedIn</a>` : ''}${personalInfo.github ? ` • <a class="link" href="${formatUrl(personalInfo.github)}" target="_blank">GitHub</a>` : ''}${personalInfo.website ? ` • <a class="link" href="${formatUrl(personalInfo.website)}" target="_blank">Portfolio</a>` : ''}${personalInfo.linkedin || personalInfo.github || personalInfo.website ? '</p>' : ''}
          </div>
        </div>

        ${summary ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="body-text">${escapeHtml(summary)}</p>
          </div>
        ` : ''}

        <div class="section">
          <div class="section-title">Technical Skills</div>
          ${groupedSkills.map((group) => `
            <div class="skill-group">
              <p class="skill-label">${escapeHtml(group.label)}</p>
              <p class="skill-text">${group.items.map((skill: any) => escapeHtml(skill.name)).join(', ')}</p>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Education</div>
          ${education.map((edu: any) => `
            <div class="item">
              <div class="item-header">
                <p class="item-title">${escapeHtml(edu.institution)}</p>
                <p class="item-meta">${escapeHtml(edu.location)}</p>
              </div>
              <p class="body-text">${escapeHtml(edu.degree)} | ${escapeHtml(edu.year)}</p>
            </div>
          `).join('')}
        </div>

          <div class="section">
          <div class="section-title">Experience</div>
          ${experiences.map((exp: any) => `
            <div class="item">
              <div class="item-header">
                <p class="item-title">${escapeHtml(exp.position)} @ ${escapeHtml(exp.company)}</p>
                <p class="item-meta">${escapeHtml(exp.startDate)} — ${escapeHtml(exp.endDate)}</p>
              </div>
              <p class="body-text">${escapeHtml(exp.location)}</p>
              <ul class="bullet-list">
                ${exp.achievements && exp.achievements.length > 0 ? exp.achievements.slice(0, 4).map((achievement: string) => `<li>${escapeHtml(achievement)}</li>`).join('') : `<li>${escapeHtml(exp.description)}</li>`}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Projects</div>
          ${projects.map((project: any) => `
            <div class="item">
              <div class="item-header">
                <p class="item-title">${escapeHtml(project.name)}</p>
                <p class="item-meta">${escapeHtml(project.duration || '')}</p>
              </div>
              ${project.role ? `<p class="body-text">${escapeHtml(project.role)}</p>` : ''}
              <ul class="bullet-list">
                <li>${escapeHtml(shortenText(project.description, 110))}</li>
              </ul>
              ${project.technologies && project.technologies.length > 0 ? `<p class="body-text">Technologies: ${project.technologies.map((tech: string) => escapeHtml(tech)).join(', ')}</p>` : ''}
              ${project.link ? `<p class="body-text"><a class="link" href="${formatUrl(project.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(project.link)}</a></p>` : ''}
            </div>
          `).join('')}
        </div>

        ${certifications.length > 0 ? `
          <div class="section">
            <div class="section-title">Certifications / Achievements</div>
            <ul class="bullet-list">
              ${certifications.map((cert: any) => `
                <li>
                  <strong>${escapeHtml(cert.name)}</strong>
                  ${cert.link ? `<br/><a class="link" href="${formatUrl(cert.link)}" target="_blank">${escapeHtml(cert.link)}</a>` : ''}
                  <br/><span style="font-size: 8px; color: #555;">${escapeHtml(cert.issuer)} • ${escapeHtml(cert.date)}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}

        ${languages.length > 0 ? `
          <div class="section">
            <div class="section-title">Languages</div>
            <p class="body-text">${languageLine}</p>
          </div>
        ` : ''}
      </body>
      </html>
    `;
  };

  const downloadFile = async (format: 'pdf' | 'docx' | 'txt') => {
    try {
      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`;
      
      if (format === 'pdf') {
        const html = generateHTML(resumeData.template || 'modern');
        const { uri } = await Print.printToFileAsync({ html });
        
        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Save Resume PDF',
            UTI: 'com.adobe.pdf'
          });
        } else {
          // Fallback: save to documents directory
          const documentsDir = FileSystem.documentDirectory;
          const newUri = `${documentsDir}${fileName}.pdf`;
          await FileSystem.moveAsync({ from: uri, to: newUri });
          Alert.alert('Success', `PDF saved to: ${newUri}`);
        }
      } else if (format === 'txt') {
        const { personalInfo, summary, skills, experiences, education, projects, certifications, languages } = resumeData;
        
        const textContent = `
${personalInfo.fullName.toUpperCase()}
${personalInfo.title}
${'='.repeat(50)}

CONTACT INFORMATION
${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}
${personalInfo.website ? `Website: ${personalInfo.website}` : ''}
${personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : ''}
${personalInfo.github ? `GitHub: ${personalInfo.github}` : ''}

${'='.repeat(50)}

PROFESSIONAL SUMMARY
${summary}

${'='.repeat(50)}

SKILLS
${skills.map((skill: any) => `• ${skill.name}`).join('\n')}

${'='.repeat(50)}

WORK EXPERIENCE
${experiences.map((exp: any) => `
${exp.position}
${exp.company} | ${exp.startDate} - ${exp.endDate} | ${exp.location}
${exp.description}
`).join('\n')}

${'='.repeat(50)}

PROJECTS
${projects.map((project: any) => `
${project.name}
Description: ${project.description}
Technologies: ${project.technologies.join(', ')}
Link: ${project.link}
`).join('\n')}

${'='.repeat(50)}

EDUCATION
${education.map((edu: any) => `
${edu.degree}
${edu.institution} | ${edu.year} | ${edu.location}
`).join('\n')}

${certifications.length > 0 ? `
${'='.repeat(50)}

CERTIFICATIONS
${certifications.map((cert: any) => `
${cert.name}
${cert.issuer} | ${cert.date}
${cert.link ? `Link: ${cert.link}` : ''}
`).join('\n')}
` : ''}

${'='.repeat(50)}

LANGUAGES
${languages.map((lang: any) => `${lang.name} (${lang.proficiency})`).join(', ')}
        `.trim();

        const fileUri = `${FileSystem.documentDirectory}${fileName}.txt`;
        await FileSystem.writeAsStringAsync(fileUri, textContent);
        
        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();
        if (isAvailable) {
          await Sharing.shareAsync(fileUri, {
            mimeType: 'text/plain',
            dialogTitle: 'Save Resume Text File',
            UTI: 'public.plain-text'
          });
        } else {
          Alert.alert('Success', `Text file saved to: ${fileUri}`);
        }
      } else {
        Alert.alert('Coming Soon', 'DOCX export will be available soon!');
      }
      
      onClose();
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export resume. Please try again.');
    }
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      animationType="slide"
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            width: "95%",
            maxWidth: 800,
            alignItems: "center",
            maxHeight: "90%",
          }}
        >
          {showPreview ? (
            <>
              {/* Full PDF Preview */}
              <CustomText
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16 }}
              >
                PDF Preview
              </CustomText>
              <ScrollView
                style={{
                  width: "100%",
                  height: 500,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#eee",
                  borderRadius: 8,
                  backgroundColor: "#f9f9f9",
                }}
                showsVerticalScrollIndicator={true}
                bounces={false}
              >
                <PreviewTemplate
                  resumeData={resumeData}
                  previewMode={true}
                  fontSize={12}
                />
              </ScrollView>
              {/* Preview Action Buttons */}
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 120,
                  }}
                  onPress={() => setShowPreview(false)}
                >
                  <CustomText style={{ color: "#fff", textAlign: "center" }}>Export PDF</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#6c757d",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 120,
                  }}
                  onPress={onClose}
                >
                  <CustomText style={{ color: "#fff", textAlign: "center" }}>Cancel</CustomText>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Export Options */}
              <CustomText
                style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16 }}
              >
                Choose Export Format
              </CustomText>
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 80,
                  }}
                  onPress={() => downloadFile('pdf')}
                >
                  <CustomText style={{ color: "#fff" }}>PDF</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#5856D6",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 80,
                  }}
                  onPress={() => downloadFile('docx')}
                >
                  <CustomText style={{ color: "#fff" }}>DOCX</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#34C759",
                    padding: 12,
                    borderRadius: 8,
                    minWidth: 80,
                  }}
                  onPress={() => downloadFile('txt')}
                >
                  <CustomText style={{ color: "#fff" }}>TXT</CustomText>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => setShowPreview(true)}>
                <CustomText style={{ color: "#007AFF" }}>← Back to Preview</CustomText>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
