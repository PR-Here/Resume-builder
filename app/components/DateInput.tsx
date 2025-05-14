import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { formatDateInput, validateDate } from '../utils/dateFormatter';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fontFamily?: string;
}

export default function DateInput({
  value,
  onChange,
  placeholder = 'MM/YYYY',
  style,
  textStyle,
  fontFamily,
}: DateInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (text: string) => {
    const formattedValue = formatDateInput(text);
    setDisplayValue(formattedValue);
    
    if (validateDate(formattedValue)) {
      onChange(formattedValue);
    }
  };

  return (
    <TextInput
      value={displayValue}
      onChangeText={handleChange}
      placeholder={placeholder}
      placeholderTextColor="#999"
      keyboardType="numeric"
      maxLength={7} // MM/YYYY
      style={[styles.input, { fontFamily }, style, textStyle]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  } as TextStyle,
}); 