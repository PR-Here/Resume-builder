import * as Font from 'expo-font';
import { FontFamily } from '../types/enums';
import { Platform } from 'react-native';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';

export const loadFonts = async () => {
  await Font.loadAsync({
    [FontFamily.DMSANS_REGULAR]: DMSans_400Regular,
    [FontFamily.DMSANS_MEDIUM]: DMSans_500Medium,
    [FontFamily.DMSANS_BOLD]: DMSans_700Bold,
  });
};

export const getFontFamily = (fontFamily: string) => {
  // For system fonts, return the platform-specific font family
  if (fontFamily === 'System') {
    return Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    });
  }
  return fontFamily;
}; 