import React from 'react';
import { Text, TouchableOpacity, type ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { makeStyles, useResponsive, useTheme } from '@/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
  title: string;
  onPress?: () => void;
  iconRight?: IconName;
  style?: ViewStyle;
};

export default function Button({ title, onPress, iconRight, style }: Props) {
  const theme = useTheme();
  const r = useResponsive();
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      style={[styles.button, style]}
    >
      <Text style={styles.title} numberOfLines={1} maxFontSizeMultiplier={1.3}>
        {title}
      </Text>
      {iconRight ? (
        <Ionicons name={iconRight} size={r.scale(16)} color={theme.colors.onPrimary} />
      ) : null}
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme, r) => ({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.scale(theme.spacing.md),
    paddingHorizontal: r.scale(theme.spacing.lg),
    height: r.scale(48),
    borderRadius: r.scale(theme.radius.md),
    backgroundColor: theme.colors.CoralRed,
  },
  title: {
    fontFamily: theme.fonts.medium,
    fontSize: r.fontSize(theme.fontSize.lg),
    color: theme.colors.onPrimary,
  },
}));
