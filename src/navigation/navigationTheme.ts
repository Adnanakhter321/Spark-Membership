import { DarkTheme, DefaultTheme, type Theme as NavTheme } from '@react-navigation/native';

import type { Theme } from '@/theme';

export function buildNavigationTheme(theme: Theme): NavTheme {
  const base = theme.dark ? DarkTheme : DefaultTheme;

  return {
    ...base,
    colors: {
      ...base.colors,
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.card,
      text: theme.colors.text,
      border: theme.colors.border,
    },
  };
}
