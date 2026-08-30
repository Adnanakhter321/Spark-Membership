
export const fonts = {
  regular: 'Inter18pt-Regular',
  medium: 'Inter18pt-Medium',
  semiBold: 'Inter18pt-SemiBold',
  bold: 'Inter18pt-Bold',
} as const;

export type FontFamily = keyof typeof fonts;
