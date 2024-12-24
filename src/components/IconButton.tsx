import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { FC } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap; // Icon name from Ionicons
  onPress: () => void; // Action on button press
  variant?: "error" | "info" | "warning" | "default" | "success"; // Color variant
  size?: "small" | "medium" | "large"; // Size of the button
  style?: StyleProp<ViewStyle>; // Additional custom styles
  buttonStyle?: "contained" | "outlined" | "normal"; // Button style
  disabled?: boolean; // Disabled state
}

const IconButton: FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = "default",
  size = "medium",
  buttonStyle = "normal",
  style,
  disabled = false,
}) => {
  // Tailwind-inspired variant-specific styles
  const variantStyles = {
    default: {
      text: "text-gray-700",
      border: "border-gray-400",
      bg: "bg-gray-100",
    },
    error: {
      text: "text-red-500",
      border: "border-red-500",
      bg: "bg-red-100",
    },
    info: {
      text: "text-blue-500",
      border: "border-blue-500",
      bg: "bg-blue-100",
    },
    warning: {
      text: "text-orange-500",
      border: "border-orange-500",
      bg: "bg-orange-100",
    },
    success: {
      text: "text-green-500",
      border: "border-green-500",
      bg: "bg-green-100",
    },
  };

  // Size-specific styles
  const sizeStyles = {
    small: {
      size: moderateScale(32), // 32x32
      iconSize: moderateScale(16),
    },
    medium: {
      size: moderateScale(48), // 48x48
      iconSize: moderateScale(24),
    },
    large: {
      size: moderateScale(64), // 64x64
      iconSize: moderateScale(32),
    },
  };

  const { size: buttonSize, iconSize } = sizeStyles[size];

  // Button style configuration
  const buttonStyleClasses = clsx(
    "flex items-center justify-center rounded-full",
    buttonStyle === "contained"
      ? `${variantStyles[variant].border} ${variantStyles[variant].bg}` // Contained style
      : buttonStyle === "outlined"
      ? `${variantStyles[variant].border} bg-transparent` // Outlined style
      : `bg-transparent border-0`, // Normal style
    disabled && "opacity-50" // Disabled state
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={buttonStyleClasses}
      style={[
        {
          width: buttonSize,
          height: buttonSize,
        },
        style,
      ]}
    >
      <Ionicons
        name={icon}
        size={iconSize}
        className={clsx(variantStyles[variant].text)}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
