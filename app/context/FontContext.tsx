import React from 'react';
import { FontFamily } from '../types/enums';

export const FontContext = React.createContext({
  fontFamily: FontFamily.DMSANS_REGULAR,
  setFontFamily: (font: FontFamily) => {},
}); 