import React from 'react';
import { Text, type TextProps } from 'react-native';
import { moderateScale, verticalScale } from 'react-native-size-matters';

import { FONTS } from '@/constants/fonts';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Dynamic color based on theme
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Map text types to styles
  const typeStyles: Record<string, object> = {
    default: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(24),
      fontFamily: FONTS.oxanium,
    },
    defaultSemiBold: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(24),
      fontWeight: '600',
      fontFamily: FONTS['oxanium-semibold'],
    },
    title: {
      fontSize: moderateScale(32),
      lineHeight: verticalScale(40),
      fontFamily: FONTS['oxanium-bold'],
    },
    subtitle: {
      fontSize: moderateScale(20),
      lineHeight: verticalScale(28),
      fontFamily: FONTS['oxanium-bold'],
    },
    link: {
      fontSize: moderateScale(16),
      lineHeight: verticalScale(24),
      color: '#0a7ea4',
      fontFamily: FONTS.oxanium,

    },
  };

  return (
    <Text
      style={[
        { color }, // Theme-based color
        typeStyles[type], // Dynamically mapped type styles
        style, // Custom styles passed from props
      ]}
      {...rest}
    />
  );
}
