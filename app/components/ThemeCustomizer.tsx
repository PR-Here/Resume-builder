import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ViewStyle, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS } from '../styles/responsive';
import { FontFamily, ColorTheme } from '../types/enums';
import { FontContext } from '../context/FontContext';
import { ThemeCustomizerProps } from '../types/interfaces';
import Text from './Text';
import CustomModal from './CustomModal';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
}

const FONT_FAMILIES = [
  { name: 'System Default', value: 'System' },
  { name: 'DM Sans Regular', value: FontFamily.DMSANS_REGULAR },
  { name: 'DM Sans Medium', value: FontFamily.DMSANS_MEDIUM },
  { name: 'DM Sans Bold', value: FontFamily.DMSANS_BOLD },
];

const COLOR_PRESETS = [
  {
    name: 'Professional Blue',
    colors: {
      primaryColor: ColorTheme.BLUE,
      secondaryColor: ColorTheme.DARK_BLUE,
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
    },
  },
  {
    name: 'Modern Dark',
    colors: {
      primaryColor: ColorTheme.RED,
      secondaryColor: ColorTheme.ORANGE,
      backgroundColor: '#1C1C1E',
      textColor: '#FFFFFF',
    },
  },
  {
    name: 'Elegant Purple',
    colors: {
      primaryColor: ColorTheme.PURPLE,
      secondaryColor: ColorTheme.BLUE,
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
    },
  },
  {
    name: 'Nature Green',
    colors: {
      primaryColor: ColorTheme.GREEN,
      secondaryColor: ColorTheme.DARK_BLUE,
      backgroundColor: '#FFFFFF',
      textColor: '#333333',
    },
  },
];

function ThemeCustomizerContent({ theme, onChange, fontFamily, onClose }: ThemeCustomizerProps & { onClose: () => void }) {
  const { setFontFamily: setGlobalFontFamily } = useContext(FontContext);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColorType, setSelectedColorType] = useState<keyof Theme | null>(null);

  const handleFontChange = (fontFamily: string) => {
    onChange({
      ...theme,
      fontFamily,
    });
    
    setGlobalFontFamily(fontFamily as FontFamily);
  };

  const handleColorChange = (colorType: keyof Theme, color: string) => {
    onChange({
      ...theme,
      [colorType]: color,
    });
  };

  const handlePresetSelect = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({
      ...theme,
      ...preset.colors,
    });
  };

  if (!theme) {
    return null;
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="h3" fontFamily={fontFamily} style={styles.headerTitle}>
            Theme Settings
          </Text>
          <Text variant="bodySmall" color="#666" fontFamily={fontFamily} style={styles.headerSubtitle}>
            Customize the appearance of your resume
          </Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons name="close" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="color-palette-outline" size={24} color="#007AFF" />
          <Text variant="bodyLarge" fontFamily={fontFamily} style={styles.sectionTitle}>
            Color Presets
          </Text>
        </View>
        <View style={styles.colorPresetContainer}>
          {COLOR_PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.name}
              style={[
                styles.colorPreset,
                theme.primaryColor === preset.colors.primaryColor && styles.colorPresetActive
              ]}
              onPress={() => handlePresetSelect(preset)}
            >
              <View style={styles.colorPreview}>
                <View style={[styles.colorDot, { backgroundColor: preset.colors.primaryColor }]} />
                <View style={[styles.colorDot, { backgroundColor: preset.colors.secondaryColor }]} />
              </View>
              <Text 
                variant="bodySmall" 
                color={theme.primaryColor === preset.colors.primaryColor ? '#007AFF' : '#666'} 
                fontFamily={fontFamily}
                style={styles.presetName}
              >
                {preset.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="brush-outline" size={24} color="#007AFF" />
          <Text variant="bodyLarge" fontFamily={fontFamily} style={styles.sectionTitle}>
            Custom Colors
          </Text>
        </View>
        <View style={styles.colorGrid}>
          {Object.entries(theme).map(([key, value]) => {
            if (key === 'fontFamily') return null;
            return (
              <TouchableOpacity
                key={key}
                style={styles.colorItem}
                onPress={() => {
                  setSelectedColorType(key as keyof Theme);
                  setShowColorPicker(true);
                }}
              >
                <View style={[styles.colorSample, { backgroundColor: value }]} />
                <Text 
                  variant="bodySmall" 
                  color="#666" 
                  fontFamily={fontFamily}
                  style={styles.colorName}
                >
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="text-outline" size={24} color="#007AFF" />
          <Text variant="bodyLarge" fontFamily={fontFamily} style={styles.sectionTitle}>
            Font Family
          </Text>
        </View>
        <View style={styles.fontContainer}>
          {FONT_FAMILIES.map((font) => (
            <TouchableOpacity
              key={font.value}
              style={[
                styles.fontButton,
                theme.fontFamily === font.value && styles.fontButtonActive,
              ]}
              onPress={() => handleFontChange(font.value)}
            >
              <Text
                variant="bodySmall"
                color={theme.fontFamily === font.value ? '#fff' : '#666'}
                fontFamily={fontFamily}
                style={styles.fontButtonText}
              >
                {font.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="eye-outline" size={24} color="#007AFF" />
          <Text variant="bodyLarge" fontFamily={fontFamily} style={styles.sectionTitle}>
            Font Preview
          </Text>
        </View>
        <View style={styles.previewContainer}>
          <Text variant="h4" fontFamily={theme.fontFamily} style={styles.previewText}>
            The quick brown fox jumps over the lazy dog
          </Text>
          <Text variant="body" fontFamily={theme.fontFamily} style={styles.previewText}>
            ABCDEFGHIJKLMNOPQRSTUVWXYZ
          </Text>
          <Text variant="body" fontFamily={theme.fontFamily} style={styles.previewText}>
            abcdefghijklmnopqrstuvwxyz
          </Text>
          <Text variant="body" fontFamily={theme.fontFamily} style={styles.previewText}>
            0123456789
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function ThemeCustomizer({ theme, onChange, fontFamily, isOpen = false, onClose }: ThemeCustomizerProps & { isOpen?: boolean; onClose?: () => void }) {
  if (!theme) {
    return null;
  }

  return (
    <CustomModal isOpen={isOpen} onClose={onClose || (() => {})}>
      <ThemeCustomizerContent
        theme={theme}
        onChange={onChange}
        fontFamily={fontFamily}
        onClose={onClose || (() => {})}
      />
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xl,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: SPACING.xs,
  },
  headerSubtitle: {
    opacity: 0.7,
  },
  closeButton: {
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.round,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginBottom: SPACING.xl,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontWeight: '600',
  },
  colorPresetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  colorPreset: {
    alignItems: 'center',
    gap: SPACING.xs,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorPresetActive: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f7ff',
  },
  colorPreview: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  colorDot: {
    width: 24,
    height: 24,
    borderRadius: BORDER_RADIUS.round,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  presetName: {
    fontWeight: '500',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  colorItem: {
    alignItems: 'center',
    gap: SPACING.xs,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorSample: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  colorName: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  fontContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  fontButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  fontButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  fontButtonText: {
    fontWeight: '500',
  },
  previewContainer: {
    backgroundColor: '#f8f9fa',
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.md,
  },
  previewText: {
    color: '#333',
  },
}); 