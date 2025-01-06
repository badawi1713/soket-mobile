import { COLORS } from '@/constants/colors';
import { clsx } from 'clsx';
import React, { FC, ReactNode } from 'react';
import { View } from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

interface AppBarProps {
  title?: string; // Title of the AppBar
  leftComponent?: ReactNode; // Component to render on the left side
  rightComponent?: ReactNode; // Component to render on the right side
  backgroundColor?: string; // Background color of the AppBar
  titleColor?: string; // Title color
  shadow?: boolean; // Whether to show a shadow
  className?: string; // Tailwind classes for additional styling
}

const AppBar: FC<AppBarProps> = ({
  title,
  leftComponent,
  rightComponent,
  backgroundColor = COLORS.light.background,
  titleColor = COLORS.light.text,
  shadow = false,
  className,
}) => {
  return (
    <View
      className={clsx(
        'flex-row items-center justify-between px-4',
        shadow && 'shadow-md',
        className
      )}
      style={{ backgroundColor, height: verticalScale(60) }}
    >
      {/* Left Component */}
      <View className="flex-1">{leftComponent}</View>

      {/* Title */}
      {title && (
        <Typography
          variant="header5"
          weight="medium"
          color={titleColor}
          className="text-center flex-1"
        >
          {title}
        </Typography>
      )}

      {/* Right Component */}
      <View className="flex-1 flex items-end">{rightComponent}</View>
    </View>
  );
};

export default AppBar;
