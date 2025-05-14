import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { SPACING, BORDER_RADIUS } from '../styles/responsive';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';

interface ButtonProps {
  onPress: () => void;
  title: string;
  fontFamily?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export default function Button({
  onPress,
  title,
  fontFamily,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const getButtonStyle = () => {
    const baseStyle = {
      ...styles.button,
      ...styles[size],
    };

    if (disabled) {
      return {
        ...baseStyle,
        ...styles.disabled,
      };
    }

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          ...styles.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          ...styles.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          ...styles.outline,
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = () => {
    if (disabled) return '#999';
    if (variant === 'outline') return '#007AFF';
    return '#fff';
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getButtonStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <Ionicons 
              name={icon as any} 
              size={20} 
              color={getTextColor()} 
              style={{ marginRight: SPACING.xs }}
            />
          )}
          <Text
            fontFamily={fontFamily}
            variant="button"
            color={getTextColor()}
            style={textStyle}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.md,
  } as ViewStyle,
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.xs,
  } as ViewStyle,
  small: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
  } as ViewStyle,
  medium: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg,
  } as ViewStyle,
  large: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  } as ViewStyle,
  primary: {
    backgroundColor: '#007AFF',
  } as ViewStyle,
  secondary: {
    backgroundColor: '#5856D6',
  } as ViewStyle,
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  } as ViewStyle,
  disabled: {
    backgroundColor: '#E5E5EA',
    borderColor: '#E5E5EA',
  } as ViewStyle,
}); 