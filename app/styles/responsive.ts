import { Dimensions, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Screen size breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
};

// Responsive width calculations
export const getResponsiveWidth = (percentage: number) => {
  return (SCREEN_WIDTH * percentage) / 100;
};

// Responsive height calculations
export const getResponsiveHeight = (percentage: number) => {
  return (SCREEN_HEIGHT * percentage) / 100;
};

// Font size scale based on screen width
const scale = SCREEN_WIDTH / 375; // 375 is the base width (iPhone 8)

export const FONT_SIZE = {
  // Headings
  h1: Math.round(32 * scale),
  h2: Math.round(24 * scale),
  h3: Math.round(20 * scale),
  h4: Math.round(18 * scale),
  h5: Math.round(16 * scale),
  h6: Math.round(14 * scale),
  h7: Math.round(12 * scale),
  h8: Math.round(10 * scale),
  h9: Math.round(8 * scale),

  // Body text
  body: Math.round(16 * scale),
  bodySmall: Math.round(14 * scale),
  bodyLarge: Math.round(18 * scale),

  // Special text
  caption: Math.round(12 * scale),
  button: Math.round(16 * scale),
  input: Math.round(16 * scale),
  label: Math.round(14 * scale),
};

// Spacing scale
export const SPACING = {
  xs: Math.round(4 * scale),
  sm: Math.round(8 * scale),
  md: Math.round(16 * scale),
  lg: Math.round(24 * scale),
  xl: Math.round(32 * scale),
  xxl: Math.round(48 * scale),
};

// Border radius
export const BORDER_RADIUS = {
  xs: Math.round(4 * scale),
  sm: Math.round(8 * scale),
  md: Math.round(12 * scale),
  lg: Math.round(16 * scale),
  xl: Math.round(24 * scale),
  round: 9999,
};

// Container padding
export const CONTAINER_PADDING = {
  xs: SPACING.sm,
  sm: SPACING.md,
  md: SPACING.lg,
  lg: SPACING.xl,
};

// Input heights
export const INPUT_HEIGHT = {
  small: Math.round(36 * scale),
  medium: Math.round(44 * scale),
  large: Math.round(52 * scale),
};

// Button heights
export const BUTTON_HEIGHT = {
  small: Math.round(36 * scale),
  medium: Math.round(44 * scale),
  large: Math.round(52 * scale),
};

// Icon sizes
export const ICON_SIZE = {
  xs: Math.round(16 * scale),
  sm: Math.round(20 * scale),
  md: Math.round(24 * scale),
  lg: Math.round(32 * scale),
  xl: Math.round(40 * scale),
};

// Card dimensions
export const CARD = {
  padding: SPACING.md,
  borderRadius: BORDER_RADIUS.md,
  maxWidth: SCREEN_WIDTH > BREAKPOINTS.lg ? 800 : SCREEN_WIDTH - SPACING.md * 2,
};

// Modal dimensions
export const MODAL = {
  width: SCREEN_WIDTH > BREAKPOINTS.lg ? 800 : SCREEN_WIDTH,
  maxHeight: SCREEN_HEIGHT * 0.9,
  borderRadius: Platform.OS === 'ios' ? BORDER_RADIUS.lg : 0,
};

// Grid system
export const GRID = {
  columnGap: SPACING.md,
  rowGap: SPACING.md,
  columns: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
  },
};

// Helper functions for responsive design
export const isSmallScreen = () => SCREEN_WIDTH < BREAKPOINTS.sm;
export const isMediumScreen = () => SCREEN_WIDTH >= BREAKPOINTS.sm && SCREEN_WIDTH < BREAKPOINTS.md;
export const isLargeScreen = () => SCREEN_WIDTH >= BREAKPOINTS.md;
export const isTablet = () => SCREEN_WIDTH >= BREAKPOINTS.lg;

// Responsive shadow styles
export const SHADOW = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
};

// Z-index values
export const Z_INDEX = {
  base: 0,
  card: 1,
  modal: 2,
  tooltip: 3,
  dropdown: 4,
  toast: 5,
};

// Animation durations
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
}; 