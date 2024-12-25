import { COLORS } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { clsx } from 'clsx';
import type React from 'react';
import { type FC, useState } from 'react';
import {
  type NativeSyntheticEvent,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  type TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import Typography from './Typography';

interface TextInputProps extends RNTextInputProps {
  label?: string; // Optional label
  error?: string; // Error message
  helperText?: string; // Helper text below input
  icon?: React.ComponentProps<typeof Ionicons>['name']; // Optional leading icon
  onIconPress?: () => void; // Optional handler for icon press
  iconPosition?: 'left' | 'right'; // Icon position (left or right)
  inputRef?: React.Ref<RNTextInput>; // Reference for TextInput
}

const TextInput: FC<TextInputProps> = ({
  label,
  error,
  helperText,
  icon,
  onIconPress,
  iconPosition = 'left', // Default to "left"
  inputRef,
  onBlur, // Prop for onBlur handling
  onFocus, // Prop for onFocus handling
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (
    event: NativeSyntheticEvent<TextInputFocusEventData>,
  ) => {
    setIsFocused(true);
    onFocus?.(event); // Call parent onFocus if provided
  };

  const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(event); // Call parent onBlur if provided
  };

  return (
    <View className="mb-4">
      {/* Label */}
      {label && (
        <Typography
          className={clsx(
            'mb-1 font-oxanium-medium',
            error
              ? 'text-error-main'
              : isFocused
              ? 'text-primary-main'
              : 'text-gray-700',
          )}
          variant="label">
          {label}
        </Typography>
      )}

      {/* Input Container */}
      <View
        className={clsx(
          'flex-row items-center rounded-md border',
          error
            ? 'border-error-main'
            : isFocused
            ? 'border-primary-main'
            : 'border-neutral-dark',
        )}
        style={{
          height: moderateScale(48), // Consistent height regardless of icon
          paddingHorizontal: scale(10), // Horizontal scaling for padding
        }}>
        {/* Icon on the Left */}
        {icon && iconPosition === 'left' && (
          <TouchableOpacity
            onPress={onIconPress}
            activeOpacity={0.8}
            className="mr-2">
            <Ionicons
              name={icon}
              size={moderateScale(20)} // Dynamic icon size
              color={
                error
                  ? COLORS.error.main
                  : isFocused
                  ? COLORS.primary.main
                  : COLORS.secondary.main
              } // Dynamic color
            />
          </TouchableOpacity>
        )}

        {/* Input Field */}
        <RNTextInput
          ref={inputRef} // Ref forwarding
          className={clsx(
            'flex-1 font-oxanium',
            error ? 'text-error-main' : 'text-gray-900 ', // Adjust for dark mode
            isFocused && 'text-black ',
          )}
          style={{
            fontSize: moderateScale(16), // Dynamic font size
          }}
          placeholderTextColor={
            error ? COLORS.error.main : COLORS.black[100] // Placeholder color
          }
          onFocus={handleFocus} // Handle focus
          onBlur={handleBlur} // Handle blur
          {...props}
        />

        {/* Icon on the Right */}
        {icon && iconPosition === 'right' && (
          <TouchableOpacity
            onPress={onIconPress}
            activeOpacity={0.8}
            className="ml-2">
            <Ionicons
              name={icon}
              size={moderateScale(20)} // Dynamic icon size
              color={
                error
                  ? COLORS.error.main
                  : isFocused
                  ? COLORS.primary.main
                  : COLORS.secondary.main
              } // Dynamic color
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Text */}
      {error && (
        <Typography
          className="mt-1 font-oxanium"
          variant="caption"
          color={COLORS.error.main}>
          {error}
        </Typography>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <Typography
          className="mt-1 font-oxanium"
          variant="caption"
          color={COLORS.neutral.dark}>
          {helperText}
        </Typography>
      )}
    </View>
  );
};

export default TextInput;
