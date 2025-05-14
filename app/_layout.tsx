import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { FontContext } from './context/FontContext';
import { FontFamily } from './types/enums';
import { ResumeProvider } from './context/ResumeContext';
import { loadFonts } from './utils/fonts';

export default function Layout() {
  const [fontFamily, setFontFamily] = useState<FontFamily>(FontFamily.DMSANS_REGULAR);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ResumeProvider>
      <FontContext.Provider value={{ fontFamily, setFontFamily }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: fontFamily,
            },
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
      </FontContext.Provider>
    </ResumeProvider>
  );
}
