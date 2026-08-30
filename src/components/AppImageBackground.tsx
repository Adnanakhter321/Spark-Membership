import React, { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import FastImage, {
  type ImageStyle,
  type ResizeMode,
  type Source,
} from '@d11/react-native-fast-image';

type Props = {
  source: Source | number;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
  overlayColor?: string;
};

const AppImageBackground = ({
  source,
  children,
  style,
  imageStyle,
  resizeMode = FastImage.resizeMode.cover,
  overlayColor,
}: Props) => {
  return (
    <View style={[styles.container, style]}>
      <FastImage
        source={source}
        resizeMode={resizeMode}
        style={[StyleSheet.absoluteFill, imageStyle]}
      />
      {overlayColor ? (
        <View style={[StyleSheet.absoluteFill, { backgroundColor: overlayColor }]} />
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default AppImageBackground;
