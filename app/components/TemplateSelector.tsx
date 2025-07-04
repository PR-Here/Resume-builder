import type { ComponentType } from 'react';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { TemplateId } from '../context/ResumeContext';
import { getResponsiveHeight, getResponsiveWidth } from '../styles/responsive';
import templateComponents from '../templates';
import ReusableBottomSheet from './ReusableBottomSheet';
import CustomText from './Text';

const TEMPLATE_LIST: { id: TemplateId; label: string }[] = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
];

const templateComponentsTyped: { [key in 'modern' | 'classic']: ComponentType<any> } = templateComponents;

interface TemplateSelectorProps {
  isVisible: boolean;
  onClose: () => void;
  resumeData: any;
  selectedTemplate: TemplateId;
  onTemplateSelect: (templateId: TemplateId) => void;
}

export default function TemplateSelector({
  isVisible,
  onClose,
  resumeData,
  selectedTemplate,
  onTemplateSelect,
}: TemplateSelectorProps) {
  const handleTemplateSelect = (templateId: TemplateId) => {
    onTemplateSelect(templateId);
    onClose();
  };

  return (
    <ReusableBottomSheet
      isVisible={isVisible}
      onClose={onClose}
      title="Choose Template"
      height="60%"
    >
      <FlatList
        data={TEMPLATE_LIST}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => {
          const TemplateComponent = templateComponentsTyped[item.id as 'modern' | 'classic'];
          const isSelected = item.id === selectedTemplate;
          return (
            <TouchableOpacity
              onPress={() => handleTemplateSelect(item.id)}
              style={[
                styles.templatePreviewWrapper,
                isSelected && styles.selectedTemplate,
              ]}
            > 
              <TemplateComponent resumeData={resumeData} previewMode={true} fontSize={12} />
              <CustomText style={[styles.templateLabel, isSelected && styles.selectedTemplateLabel]}>
                {item.label}
              </CustomText>
            </TouchableOpacity>
          );
        }}
      />
    </ReusableBottomSheet>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  templatePreviewWrapper: {
    marginHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#f4f4f4',
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    height: getResponsiveHeight(40),
    width: getResponsiveWidth(40),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  selectedTemplate: {
    borderColor: '#007AFF',
    backgroundColor: '#e6f0ff',
  },
  templateLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  selectedTemplateLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
}); 