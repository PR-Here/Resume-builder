import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle } from 'react-native';
import { FONT_SIZE } from '../styles/responsive';

interface TextProps extends RNTextProps {
  fontFamily?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodyLarge' | 'bodySmall' | 'button';
  color?: string;
}

export default function Text({ 
  fontFamily, 
  variant = 'body', 
  color = '#333',
  style,
  ...props 
}: TextProps) {
  const getFontSize = () => {
    switch (variant) {
      case 'h1': return FONT_SIZE.h1;
      case 'h2': return FONT_SIZE.h2;
      case 'h3': return FONT_SIZE.h3;
      case 'h4': return FONT_SIZE.h4;
      case 'body': return FONT_SIZE.body;
      case 'bodyLarge': return FONT_SIZE.bodyLarge;
      case 'bodySmall': return FONT_SIZE.bodySmall;
      case 'button': return FONT_SIZE.button;
      default: return FONT_SIZE.body;
    }
  };

  return (
    <RNText
      style={[
        styles.text,
        {
          fontSize: getFontSize(),
          color,
          fontFamily,
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
  } as TextStyle,
}); 