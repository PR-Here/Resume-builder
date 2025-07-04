import { Ionicons } from '@expo/vector-icons';
import type { ComponentType } from 'react';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TemplateId } from '../context/ResumeContext';
import { getResponsiveHeight, getResponsiveWidth } from '../styles/responsive';
import templateComponents from '../templates';
import CustomText from './Text';

const { width } = Dimensions.get('window');

const TEMPLATE_LIST: { id: TemplateId; label: string }[] = [
  { id: 'modern', label: 'Modern' },
  { id: 'classic', label: 'Classic' },
];

const templateComponentsTyped: { [key in 'modern' | 'classic']: ComponentType<any> } = templateComponents;

interface BottomSheetProps {
  resumeData: any;
  selectedTemplate: TemplateId;
  onTemplateSelect: (templateId: TemplateId) => void;
  onClose?: () => void;
  isVisible?: boolean;
}

export default function BottomSheet({ resumeData, selectedTemplate, onTemplateSelect, onClose, isVisible = true }: BottomSheetProps) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').height, 0], // Start from full screen height below, slide to 0
  });

  return (
    <>
      <Animated.View 
        style={[
          styles.backdrop,
          {
            opacity: slideAnim,
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backdropTouchable} 
          onPress={onClose}
        />
      </Animated.View>
      <Animated.View 
        style={[
          styles.container,
          {
            transform: [{ translateY }],
          }
        ]}
      >
        <View style={styles.handle} />
        <View style={styles.header}>
          <CustomText style={styles.title}>Choose Template</CustomText>
          {onClose && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
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
                onPress={() => onTemplateSelect(item.id)}
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
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 12,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    height: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  closeButton: {
    padding: 8,
    marginLeft: 8,
  },
  flatListContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}); 