import React from 'react';
import { TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { makeStyles, useResponsive, useTheme } from '@/theme';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
  name: IconName;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
};

export default function IconButton({ name, onPress, accessibilityLabel, style }: Props) {
  const theme = useTheme();
  const r = useResponsive();
  const styles = useStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={[styles.button, style]}
    >
      <Ionicons name={name} size={r.scale(30)} color={theme.colors.border} />
    </TouchableOpacity>
  );
}

const useStyles = makeStyles((theme, r) => ({
  button: {
    width: r.scale(56),
    height: r.scale(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: r.scale(theme.radius.md),
    backgroundColor: theme.colors.card,
  },
}));
