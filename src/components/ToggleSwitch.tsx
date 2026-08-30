import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

import { useResponsive, useTheme, withAlpha } from '@/theme';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
};

export default function ToggleSwitch({
  value,
  onValueChange,
  onLabel = 'Enabled',
  offLabel = 'Disable',
  disabled = false,
}: Props) {
  const theme = useTheme();
  const r = useResponsive();

  const width = r.scale(134);
  const height = r.scale(38);
  const knob = height * 0.95;

  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 220,

      useNativeDriver: false,
    }).start();
  }, [value, progress]);

  const between = (off: string | number, on: string | number) =>
    progress.interpolate({ inputRange: [0, 1], outputRange: [off, on] as never });

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(!value)}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
    >
      <Animated.View
        style={[
          styles.track,
          disabled && styles.disabled,
          {
            width,
            height,
            borderRadius: height / 2,

            backgroundColor: between(
              withAlpha(theme.colors.textMuted, 0.22),
              withAlpha(theme.colors.primary, 0.18),
            ),
          },
        ]}
      >
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.label,
            {
              fontFamily: theme.fonts.medium,
              fontSize: r.fontSize(theme.fontSize.lg),
              color: between(theme.colors.textMuted, theme.colors.primary),
              marginHorizontal: r.scale(value ? theme.spacing.xl : theme.spacing.lg),

              transform: [{ translateX: between(knob * 0.85, 0) }],
            },
          ]}
        >
          {value ? onLabel : offLabel}
        </Animated.Text>

        <Animated.View
          style={[
            styles.knob,
            {
              width: knob,
              height: knob,
              borderRadius: knob / 2,
              top: (height - knob) / 2,
              backgroundColor: between(theme.colors.textMuted, theme.colors.primary),
              transform: [{ translateX: between(-knob * 0.08, width - knob * 0.92) }],
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    flexShrink: 1,
  },
  knob: {
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
