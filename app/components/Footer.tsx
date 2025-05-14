import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FONT_SIZE, SPACING } from '../styles/responsive';
import Text from './Text';
import Button from './Button';

interface FooterProps {
  fontFamily: string;
  onExport: () => void;
  onTemplate: () => void;
  onTheme: () => void;
  style?: ViewStyle;
}

export default function Footer({ fontFamily, onExport, onTemplate, onTheme, style }: FooterProps) {
  return (
    <View style={style}>

      <Button
        title="Theme"
        variant="outline"
        fontFamily={fontFamily}
        onPress={onTheme}
        style={{ width: "45%" }}
        textStyle={{ fontSize: FONT_SIZE.h7 }}
      />

      <Button
        title="Export"
        variant="primary"
        fontFamily={fontFamily}
        onPress={onExport}
        style={{ width: "45%" }}
        textStyle={{ fontSize: FONT_SIZE.h7 }}
      />
    </View>
  );
};

