import React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

import { useResponsive, useTheme, type Colors, type Theme } from '@/theme';
import { fonts } from '@/theme/fonts';

type Props = TextProps & {
  size?: keyof Theme['fontSize'];
  weight?: keyof typeof fonts;
  color?: keyof Colors;
  style?: TextStyle | TextStyle[];
};

export default function AppText({
  size = 'md',
  weight = 'regular',
  color = 'text',
  style,
  ...rest
}: Props) {
  const theme = useTheme();
  const r = useResponsive();

  return (
    <Text
      maxFontSizeMultiplier={1.3}
      {...rest}
      style={[
        {
          fontFamily: theme.fonts[weight],
          fontSize: r.fontSize(theme.fontSize[size]),
          color: theme.colors[color],
        },
        style,
      ]}
    />
  );
}
