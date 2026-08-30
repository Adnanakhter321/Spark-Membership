import { useMemo } from 'react';
import { PixelRatio, useWindowDimensions } from 'react-native';

const DESIGN_WIDTH = 834;

export type Responsive = ReturnType<typeof useResponsive>;

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const shortSide = Math.min(width, height);

    const ratio = Math.min(Math.max(shortSide / DESIGN_WIDTH, 0.45), 1.6);

    const round = PixelRatio.roundToNearestPixel;

    const scale = (n: number) => round(n + (n * ratio - n) * 0.5);

    const fontSize = (n: number) => round(n + (n * ratio - n) * 0.4);

    return { width, height, scale, fontSize };
  }, [width, height]);
}
