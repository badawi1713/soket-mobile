import Ionicons from '@react-native-vector-icons/ionicons';
import { clsx } from 'clsx';
import type React from 'react';
import type { FC } from 'react';
import { type StyleProp, TouchableOpacity, type ViewStyle } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

interface ChipProps {
  text: string; // Chip label
  onPress?: () => void; // Action when the chip is pressed
  onClose?: () => void; // Action when close icon is pressed
  size?: 'small' | 'medium' | 'large'; // Size of the chip
  variant?: 'contained' | 'outlined'; // Style of the chip
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'; // Color variant
  icon?: React.ComponentProps<typeof Ionicons>['name']; // Optional leading icon
  shape?: 'rounded' | 'rectangular' | 'pill'; // Shape of the chip
  style?: StyleProp<ViewStyle>; // Additional custom styles
}

const Chip: FC<ChipProps> = ({
  text,
  onPress,
  onClose,
  size = 'medium',
  variant = 'contained',
  color = 'primary',
  icon,
  shape = 'pill', // Default shape is pill (fully rounded)
  style,
}) => {
  // Tailwind-inspired color classes based on the provided color palette
  const colorClasses = {
    primary: {
      base: 'bg-primary-main text-white',
      outlined: 'border-primary-main text-primary-main',
    },
    secondary: {
      base: 'bg-secondary-main text-white',
      outlined: 'border-secondary-main text-secondary-main',
    },
    success: {
      base: 'bg-success-main text-white',
      outlined: 'border-success-main text-success-main',
    },
    error: {
      base: 'bg-error-main text-white',
      outlined: 'border-error-main text-error-main',
    },
    info: {
      base: 'bg-info-main text-white',
      outlined: 'border-info-main text-info-main',
    },
    warning: {
      base: 'bg-warning-dark text-white',
      outlined: 'border-warning-dark text-warning-dark',
    },
  };

  // Define size styles
  const sizeStyles = {
    small: {
      paddingVertical: verticalScale(2),
      paddingHorizontal: scale(8),
      fontSize: moderateScale(12),
      iconSize: moderateScale(14),
    },
    medium: {
      paddingVertical: verticalScale(4),
      paddingHorizontal: scale(12),
      fontSize: moderateScale(14),
      iconSize: moderateScale(16),
    },
    large: {
      paddingVertical: verticalScale(6),
      paddingHorizontal: scale(16),
      fontSize: moderateScale(16),
      iconSize: moderateScale(20),
    },
  };

  // Define shape styles
  const shapeStyles = {
    rounded: {
      borderRadius: moderateScale(8), // Rounded corners
    },
    rectangular: {
      borderRadius: moderateScale(4), // Slightly rounded
    },
    pill: {
      borderRadius: moderateScale(50), // Fully rounded
    },
  };

  const { paddingVertical, paddingHorizontal, fontSize, iconSize } =
    sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={clsx(
        'flex-row items-center',
        variant === 'contained'
          ? `${colorClasses[color].base}`
          : `border ${colorClasses[color].outlined}`
      )}
      style={[
        {
          paddingVertical,
          paddingHorizontal,
          ...shapeStyles[shape], // Apply shape styles dynamically
        },
        style || {}, // Ensure no `undefined` style is spread
      ]}
    >
      {/* Leading Icon */}
      {icon && (
        <Ionicons
          name={icon}
          size={iconSize}
          color={
            variant === 'contained'
              ? 'white'
              : colorClasses[color].outlined.split(' ')[1]
          }
          style={{ marginRight: scale(8) }}
        />
      )}

      {/* Chip Text */}
      <Typography
        className={clsx(
          'font-medium',
          variant === 'contained' ? 'text-white' : colorClasses[color].outlined
        )}
        style={{
          fontSize,
        }}
      >
        {text}
      </Typography>

      {/* Close Icon */}
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.8}
          style={{ marginLeft: scale(8) }}
        >
          <Ionicons
            name="close"
            size={iconSize}
            color={
              variant === 'contained'
                ? 'white'
                : colorClasses[color].outlined.split(' ')[1]
            }
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Chip;
