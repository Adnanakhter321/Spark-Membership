import { darkColors, lightColors, type Colors } from './colors';
import { fonts } from './fonts';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 22,
  xxl: 28,
};

export type Theme = {
  dark: boolean;
  colors: Colors;
  fonts: typeof fonts;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
};

export const lightTheme: Theme = {
  dark: false,
  colors: lightColors,
  fonts,
  spacing,
  radius,
  fontSize,
};

export const darkTheme: Theme = {
  dark: true,
  colors: darkColors,
  fonts,
  spacing,
  radius,
  fontSize,
};
