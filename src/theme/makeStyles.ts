import { useMemo } from 'react';
import { StyleSheet, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

import { useResponsive, type Responsive } from './responsive';
import { useTheme } from './useTheme';
import type { Theme } from './theme';

type Styles = Record<string, ViewStyle | TextStyle | ImageStyle>;

export function makeStyles<T extends Styles>(build: (theme: Theme, r: Responsive) => T) {
  return function useStyles() {
    const theme = useTheme();
    const r = useResponsive();

    return useMemo(() => StyleSheet.create(build(theme, r)), [theme, r]);
  };
}
