import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FontContext } from './context/FontContext';
import { FontFamily } from './types/enums';
import { loadFonts } from './utils/fonts';

export default function Layout() {
  const [fontFamily, setFontFamily] = useState<FontFamily>(FontFamily.DMSANS_REGULAR);

  React.useEffect(() => {
    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontFamily, setFontFamily }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'Resume Builder',
            }}
          />
          <Stack.Screen
            name="resume-builder"
            options={{
              title: 'Create Resume',
            }}
          />
          <Stack.Screen
            name="preview"
            options={{
              title: 'Preview Resume',
              presentation: 'modal',
            }}
          />
          <Stack.Screen
            name="settings"
            options={{
              title: 'Resume Settings',
            }}
          />
          <Stack.Screen
            name="export"
            options={{
              title: 'Export Resume',
              presentation: 'modal',
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </FontContext.Provider>
  );
}
