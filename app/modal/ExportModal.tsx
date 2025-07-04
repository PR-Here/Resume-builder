import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomModal from "../components/CustomModal";
import CustomText from "../components/Text";
import { TemplateId } from "../context/ResumeContext";

interface ExportModalProps {
  resumeData: any;
  isOpen: boolean;
  onClose: () => void;
  SelectedTemplateComponent: React.ComponentType<{
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
  // Helper function to format URLs properly
  const formatUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  const generateHTML = (template: TemplateId) => {
    const { personalInfo, summary, skills, experiences, education, projects, certifications, languages } = resumeData;
    
    // Determine number of columns based on skill length
    const numColumns = skills.length > 20 ? 3 : skills.length > 10 ? 2 : 1;
    const skillsColumns: any[][] = Array.from({ length: numColumns }, () => []);
    skills.forEach((skill: any, index: number) => {
      skillsColumns[index % numColumns].push(skill);
    });
    
    const skillsList = skillsColumns.map((column, columnIndex) => `
      <div style="flex: 1; margin-right: ${columnIndex < numColumns - 1 ? '16px' : '0'};">
        ${column.map((skill: any) => `<p style="margin: 0 0 2px 0; color: #000; font-size: 14px; line-height: 18px; font-family: 'Poppins', sans-serif;">• ${skill.name}</p>`).join('')}
      </div>
    `).join('');
    
    const experienceList = experiences.map((exp: any) => `
      <div style="margin-bottom: 8px; page-break-inside: avoid;">
        <h3 style="color: #000; margin: 0 0 4px 0; font-size: 18px; font-weight: 600; font-family: 'Poppins', sans-serif;">${exp.position} @ ${exp.company}</h3>
        <p style="color: #000; margin: 0 0 4px 0; font-size: 15px; font-family: 'Poppins', sans-serif;">${exp.startDate} - ${exp.endDate} | ${exp.location}</p>
        <p style="margin: 0; color: #000; font-size: 14px; line-height: 18px; font-family: 'Poppins', sans-serif;">${exp.description}</p>
      </div>
    `).join('');
    
    const educationList = education.map((edu: any) => `
      <div style="margin-bottom: 16px;">
        <h3 style="color: #000; margin: 0 0 4px 0; font-size: 18px; font-weight: 600; font-family: 'Poppins', sans-serif;">${edu.degree} - ${edu.institution}</h3>
        <p style="color: #000; margin: 0; font-size: 14px; font-family: 'Poppins', sans-serif;">${edu.year} | ${edu.location}</p>
      </div>
    `).join('');
    
    const projectList = projects.map((project: any) => {
      // Create technology tags that wrap to new lines
      const techTags = project.technologies.map((tech: string) => 
        `<span style="display: inline-block; background-color: #f0f0f0; padding: 2px 8px; margin: 2px 4px 2px 0; border-radius: 4px; font-size: 12px; color: #333; font-family: 'Poppins', sans-serif;">${tech}</span>`
      ).join('');
      
      return `
        <div style="margin-bottom: 12px; page-break-inside: avoid;">
          <h3 style="color: #000; margin: 0 0 4px 0; font-size: 18px; font-weight: 600; font-family: 'Poppins', sans-serif;">${project.name}</h3>
          <p style="margin: 0 0 4px 0; color: #000; font-size: 14px; line-height: 20px; font-family: 'Poppins', sans-serif;">Description: ${project.description}</p>
          <p style="color: #000; margin: 0 0 4px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">Technologies:</p>
          <div style="margin-bottom: 8px; line-height: 1.4;">
            ${techTags}
          </div>
          <p style="color: #000; margin: 0; font-size: 14px; font-family: 'Poppins', sans-serif;">App Link: <a href="${formatUrl(project.link)}" style="color: #007AFF; text-decoration: none;" target="_blank">${project.link}</a></p>
        </div>
      `;
    }).join('');
    
    const languageList = languages.map((lang: any) => `${lang.name} (${lang.proficiency})`).join(', ');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${personalInfo.fullName} - Resume</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #000;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
          }
          .header {
            margin-bottom: 20px;
          }
          .name {
            font-size: 32px;
            color: #000;
            margin: 0 0 4px 0;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
          }
          .title {
            font-size: 18px;
            color: #000;
            margin: 0 0 12px 0;
            font-family: 'Poppins', sans-serif;
          }
          .personal-info {
            margin-bottom: 12px;
          }
          .personal-info p {
            color: #000;
            font-size: 14px;
            margin: 0 0 2px 0;
            font-family: 'Poppins', sans-serif;
            line-height: 18px;
          }
          .section {
            margin: 8px 0 4px 0;
          }
          .section-title {
            font-size: 20px;
            color: #000;
            margin: 0 0 8px 0;
            font-family: 'Poppins', sans-serif;
            font-weight: bold;
          }
          .skills-section {
            margin: 40px 0 8px 0;
          }
          .summary {
            color: #000;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            margin-bottom: 4px;
            line-height: 20px;
          }
          .skills-list {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            margin-bottom: 12px;
          }
          .experience-item, .education-item, .project-item {
            margin-bottom: 8px;
          }
          .experience-item h3, .education-item h3, .project-item h3 {
            font-family: 'Poppins', sans-serif;
            color: #000;
            margin: 0 0 4px 0;
            font-size: 18px;
            font-weight: 600;
          }
          .experience-item p, .education-item p, .project-item p {
            font-family: 'Poppins', sans-serif;
            color: #000;
            margin: 0 0 4px 0;
            font-size: 15px;
            line-height: 20px;
          }
          .languages {
            color: #000;
            font-size: 14px;
            font-family: 'Poppins', sans-serif;
            line-height: 20px;
          }
          a {
            color: #007AFF;
            text-decoration: none;
            font-family: 'Poppins', sans-serif;
          }
          a:hover {
            text-decoration: underline;
          }
          @media print {
            body { margin: 0; padding: 15px; }
            .section { page-break-inside: avoid; }
            .experience-item, .project-item { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${personalInfo.fullName}</h1>
          <p class="title">${personalInfo.title}</p>
          <div class="personal-info">
            <p>Email- ${personalInfo.email}</p>
            <p>Phone- ${personalInfo.phone}</p>
            <p>Location- ${personalInfo.location}</p>
            ${personalInfo.website ? `<p>Portfolio Website- <a href="${formatUrl(personalInfo.website)}" style="color: #007AFF; text-decoration: none;" target="_blank">${personalInfo.website}</a></p>` : ''}
            ${personalInfo.linkedin ? `<p>LinkedIn- <a href="${formatUrl(personalInfo.linkedin)}" style="color: #007AFF; text-decoration: none;" target="_blank">${personalInfo.linkedin}</a></p>` : ''}
            ${personalInfo.github ? `<p>GitHub- <a href="${formatUrl(personalInfo.github)}" style="color: #007AFF; text-decoration: none;" target="_blank">${personalInfo.github}</a></p>` : ''}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Summary</h2>
          <p class="summary">${summary}</p>
        </div>

        <div class="skills-section">
          <h2 class="section-title">Skills</h2>
          <div class="skills-list">
            ${skillsList}
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Experience</h2>
          ${experienceList}
        </div>

        <div class="section">
          <h2 class="section-title">Projects</h2>
          ${projectList}
        </div>

        <div class="section">
          <h2 class="section-title">Education</h2>
          ${educationList}
        </div>

        ${certifications.length > 0 ? `
        <div class="section">
          <h2 class="section-title">Certifications</h2>
          ${certifications.map((cert: any) => `
            <div class="experience-item">
              <h3 style="color: #000; margin: 0 0 4px 0; font-size: 15px; font-weight: 600; font-family: 'Poppins', sans-serif;">${cert.name}</h3>
              <p style="color: #000; margin: 0 0 4px 0; font-size: 14px; font-family: 'Poppins', sans-serif;">${cert.issuer} | ${cert.date}</p>
              ${cert.link ? `<p style="color: #000; margin: 0; font-size: 14px; font-family: 'Poppins', sans-serif;">Link: <a href="${formatUrl(cert.link)}" style="color: #007AFF; text-decoration: none;" target="_blank">${cert.link}</a></p>` : ''}
            </div>
          `).join('')}
        </div>
        ` : ''}

        <div class="section">
          <h2 class="section-title">Languages</h2>
          <p class="languages">${languageList}</p>
        </div>
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
            width: "90%",
            alignItems: "center",
          }}
        >
          {/* Small Preview */}
          <View
            style={{
              width: 300,
              height: 400,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#eee",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <SelectedTemplateComponent
              resumeData={resumeData}
              previewMode={true}
              fontSize={14}
            />
          </View>
          {/* Export Format Buttons */}
          <CustomText
            style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}
          >
            Export as:
          </CustomText>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => downloadFile('pdf')}
            >
              <CustomText style={{ color: "#fff" }}>PDF</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#5856D6",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => downloadFile('docx')}
            >
              <CustomText style={{ color: "#fff" }}>DOCX</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#34C759",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => downloadFile('txt')}
            >
              <CustomText style={{ color: "#fff" }}>TXT</CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 16 }}>
            <CustomText style={{ color: "#007AFF" }}>Cancel</CustomText>
          </TouchableOpacity>
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
