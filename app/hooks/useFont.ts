import { useContext, useState, useEffect } from 'react';
import { FontContext } from '../context/FontContext';
import { FontFamily } from '../types/enums';
import { loadFonts } from '../utils/fonts';

export const useFont = () => {
  const context = useContext(FontContext);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
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
    return { fontFamily: FontFamily.DMSANS_REGULAR, loadFonts: () => {} };
  }

  return context;
}; 