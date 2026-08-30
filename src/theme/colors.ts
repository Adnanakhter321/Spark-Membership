
export type Colors = {
  background: string;
  card: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  onPrimary: string;
  success: string;
  warning: string;
  danger: string;
  pink: string;
  gray: string;
  CoralRed: string;
  CoralRed2: string;
  CharcoalGray: string;
};

export const lightColors: Colors = {
  background: '#F7F8FA',
  card: '#FFFFFF',
  text: '#161A23',
  textMuted: '#6B7280',
  border: '#9F9F9F',
  primary: '#CD523C',
  onPrimary: '#FFFFFF',
  success: '#17B26A',
  warning: '#F79009',
  danger: '#F04438',
  pink: '#FFE7E3',
  gray: '#C5C5C5',
  CoralRed: '#DE4631',
  CoralRed2: '#DE4631',
  CharcoalGray: '#585757',
};

export const darkColors: Colors = {
  background: '#0F131B',
  card: '#181D27',
  text: '#F3F4F6',
  textMuted: '#9AA3B2',
  border: '#3A4150',
  primary: '#E0705A',
  onPrimary: '#FFFFFF',
  success: '#17B26A',
  warning: '#F79009',
  danger: '#F04438',
  pink: '#3A211C',
  gray: '#3A4150',
  CoralRed: '#DE4631',
  CoralRed2: '#DE4631',
  CharcoalGray: '#585757',
};

export function withAlpha(hex: string, alpha: number) {
  const value = hex.replace('#', '');
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
