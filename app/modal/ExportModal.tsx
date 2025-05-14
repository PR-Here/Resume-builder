import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../components/Text";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import CustomModal from "../components/CustomModal";

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
              onPress={async () => {
                // PDF Export
                const html = `<html><body><h1>${resumeData.personalInfo.fullName}</h1><h2>${resumeData.personalInfo.title}</h2><h3>Summary</h3><p>${resumeData.summary}</p></body></html>`;
                const { uri } = await Print.printToFileAsync({ html });
                await Sharing.shareAsync(uri, {
                  UTI: ".pdf",
                  mimeType: "application/pdf",
                });
                onClose();
              }}
            >
              <CustomText style={{ color: "#fff" }}>PDF</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#5856D6",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => {
                alert("DOCX export coming soon!");
                onClose();
              }}
            >
              <CustomText style={{ color: "#fff" }}>DOCX</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#34C759",
                padding: 10,
                borderRadius: 8,
              }}
              onPress={() => {
                alert("TXT export coming soon!");
                onClose();
              }}
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
