/* eslint-disable react-native/no-inline-styles */
import Ionicons from '@react-native-vector-icons/ionicons';
import { clsx } from 'clsx';
import React, { type FC } from 'react';
import {
  type StyleProp,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

interface CheckboxProps {
  handleCheck: (checked: boolean) => void; // Callback when checked
  disabled?: boolean; // Disable the checkbox
  size?: 'small' | 'medium' | 'large'; // Size of the checkbox
  error?: boolean; // Error state
  label?: string; // Label for the checkbox
  helperText?: string; // Additional helper text
  value?: boolean; // Checked value
  style?: StyleProp<ViewStyle>; // Additional container styles
  labelStyle?: StyleProp<TextStyle>; // Additional label styles
  helperTextStyle?: StyleProp<TextStyle>; // Additional helper text styles
}

const Checkbox: FC<CheckboxProps> = ({
  handleCheck,
  disabled = false,
  size = 'medium',
  error = false,
  label,
  helperText,
  value = false,
  style,
  labelStyle,
  helperTextStyle,
}) => {
  // Define Tailwind-based dynamic colors
  const colorClasses = {
    primary: 'bg-primary-main text-white border-primary-main',
    error: 'bg-error-main text-white border-error-main',
    gray: 'bg-gray-400 text-gray-800 border-gray-400',
  };

  // Size-specific styles
  const sizeStyles = {
    small: {
      boxSize: moderateScale(16),
      iconSize: moderateScale(12),
      labelFontSize: moderateScale(12),
      helperFontSize: moderateScale(10),
    },
    medium: {
      boxSize: moderateScale(20),
      iconSize: moderateScale(16),
      labelFontSize: moderateScale(14),
      helperFontSize: moderateScale(12),
    },
    large: {
      boxSize: moderateScale(24),
      iconSize: moderateScale(20),
      labelFontSize: moderateScale(16),
      helperFontSize: moderateScale(14),
    },
  };

  const { boxSize, iconSize, labelFontSize, helperFontSize } = sizeStyles[size];

  return (
    <View
      style={[
        style,
        {
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      {/* Checkbox Container */}
      <TouchableOpacity
        onPress={() => !disabled && handleCheck(!value)}
        activeOpacity={0.8}
        disabled={disabled}
        className={clsx(
          'flex-row items-center justify-center rounded',
          value
            ? colorClasses.primary
            : error
            ? colorClasses.error
            : colorClasses.gray
        )}
        style={{
          width: boxSize,
          height: boxSize,
          marginRight: scale(8),
        }}
      >
        {/* Checkbox Icon */}
        {value && (
          <Ionicons
            name="checkmark"
            size={iconSize}
            color={value ? 'white' : 'gray'}
          />
        )}
      </TouchableOpacity>

      {/* Label and Helper Text */}
      <View>
        {/* Label */}
        {label && (
          <Typography
            style={[{ fontSize: labelFontSize }, labelStyle]}
            className={clsx(
              'font-medium',
              error ? 'text-error-main' : 'text-gray-800'
            )}
            variant="label"
          >
            {label}
          </Typography>
        )}

        {/* Helper Text */}
        {helperText && (
          <Typography
            variant="caption"
            style={[
              { fontSize: helperFontSize, marginTop: verticalScale(2) },
              helperTextStyle,
            ]}
            className={clsx(error ? 'text-error-main' : 'text-gray-500')}
          >
            {helperText}
          </Typography>
        )}
      </View>
    </View>
  );
};

export default Checkbox;
