import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import type { FC } from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { COLORS } from '@/constants/colors';

interface IconButtonProps {
  icon: React.ComponentProps<typeof Ionicons>['name']; // Icon name
  onPress: () => void; // Action on button press
  variant?: 'error' | 'info' | 'warning' | 'default' | 'success'; // Color variant
  size?: 'small' | 'medium' | 'large'; // Button size
  style?: StyleProp<ViewStyle>; // Custom styles
  buttonStyle?: 'contained' | 'outlined' | 'normal'; // Button style
  iconColor?: string; // Custom icon color (overrides variant color)
  disabled?: boolean; // Disabled state
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = 'default',
  size = 'medium',
  buttonStyle = 'normal',
  style,
  iconColor,
  disabled = false,
}) => {
  // Variant-specific colors
  const variantStyles = {
    default: {
      text: COLORS.neutral.main,
      border: COLORS.border.light,
      bg: COLORS.background.main,
    },
    error: {
      text: COLORS.error.main,
      border: COLORS.error.main,
      bg: COLORS.error.light,
    },
    info: {
      text: COLORS.info.main,
      border: COLORS.info.main,
      bg: COLORS.info.light,
    },
    warning: {
      text: COLORS.warning.main,
      border: COLORS.warning.main,
      bg: COLORS.warning.light,
    },
    success: {
      text: COLORS.success.main,
      border: COLORS.success.main,
      bg: COLORS.success.light,
    },
  };

  // Size-specific styles
  const sizeStyles = {
    small: {
      size: moderateScale(32), // Button: 32x32
      iconSize: moderateScale(16), // Icon size: 16
    },
    medium: {
      size: moderateScale(48), // Button: 48x48
      iconSize: moderateScale(24), // Icon size: 24
    },
    large: {
      size: moderateScale(64), // Button: 64x64
      iconSize: moderateScale(32), // Icon size: 32
    },
  };

  const { size: buttonSize, iconSize } = sizeStyles[size];

  // Button style configuration
  const buttonStyleConfig = [
    {
      width: buttonSize,
      height: buttonSize,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: buttonSize / 2,
      borderWidth: buttonStyle !== 'normal' ? 1 : 0,
      backgroundColor:
        buttonStyle === 'contained'
          ? variantStyles[variant].bg
          : 'transparent',
      borderColor:
        buttonStyle === 'outlined' || buttonStyle === 'contained'
          ? variantStyles[variant].border
          : 'transparent',
      opacity: disabled ? 0.5 : 1,
    },
    style, // Custom style
  ] as StyleProp<ViewStyle>; // Explicitly cast the array as StyleProp<ViewStyle>

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={buttonStyleConfig} // Style passed as a StyleProp
    >
      <Ionicons
        name={icon}
        size={iconSize}
        color={iconColor || variantStyles[variant].text} // Custom icon color or variant color
      />
    </TouchableOpacity>
  );
};

export default IconButton;
