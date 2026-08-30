import type { ViewStyle } from 'react-native';

declare module '@d11/react-native-fast-image' {
  interface ImageStyle
    extends Omit<
      ViewStyle,
      | 'backfaceVisibility'
      | 'backgroundColor'
      | 'borderBottomLeftRadius'
      | 'borderBottomRightRadius'
      | 'borderColor'
      | 'borderRadius'
      | 'borderTopLeftRadius'
      | 'borderTopRightRadius'
      | 'borderWidth'
      | 'opacity'
    > {}
}
