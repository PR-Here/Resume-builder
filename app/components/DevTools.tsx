import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useResumeStore } from '../store/resumeStore';
import { BORDER_RADIUS, SPACING } from '../styles/responsive';
import CustomText from './Text';

interface DevToolsProps {
  fontFamily: string;
}

export default function DevTools({ fontFamily }: DevToolsProps) {
  const { forceReloadMockData } = useResumeStore();

  const handleReloadMockData = async () => {
    forceReloadMockData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleReloadMockData}
      >
        <Ionicons name="refresh-outline" size={20} color="#007AFF" />
        <CustomText
          variant="bodySmall"
          color="#007AFF"
          fontFamily={fontFamily}
          style={styles.buttonText}
        >
          Reload Mock Data
        </CustomText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.sm,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
    backgroundColor: '#fff',
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: '#007AFF',
    gap: SPACING.xs,
  },
  buttonText: {
    fontWeight: '500',
  },
}); 