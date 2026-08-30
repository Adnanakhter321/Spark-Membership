import React from 'react';
import { Image, TextInput, View, type ViewStyle } from 'react-native';

import { images } from '@/assets/images';
import { makeStyles, useResponsive, useTheme } from '@/theme';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: ViewStyle;
};

export default function SearchInput({
  value,
  onChangeText,
  placeholder = 'Enter name, ID',
  style,
}: Props) {
  const theme = useTheme();
  const r = useResponsive();
  const styles = useStyles();

  return (
    <View style={[styles.wrapper, style]}>

      <Image
        source={images.search}
        resizeMode="contain"
        style={{ width: r.scale(27), height: r.scale(27) }}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.border}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={[
          styles.input,
          {
            fontFamily: theme.fonts.regular,
            fontSize: r.fontSize(theme.fontSize.lg),
            color: theme.colors.text,
          },
        ]}
      />
    </View>
  );
}

const useStyles = makeStyles((theme, r) => ({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: r.scale(theme.spacing.sm),
    height: r.scale(48),
    paddingHorizontal: r.scale(theme.spacing.md),
    borderWidth: 1,
    borderColor: theme.colors.gray,
    borderRadius: r.scale(theme.radius.md),
    backgroundColor: theme.colors.card,
  },
  input: {
    flex: 1,

    padding: 0,
  },
}));
