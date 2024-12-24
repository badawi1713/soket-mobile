import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { FC, useState } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Typography from "./Typography";

interface ButtonProps {
  title: string; // Button label
  onPress: () => void; // Handler for button press
  size?: "small" | "medium" | "large"; // Button size
  variant?: "outlined" | "contained" | "base"; // Button variant
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"; // Button color
  icon?: keyof typeof Ionicons.glyphMap; // Optional icon name
  iconPosition?: "left" | "right"; // Icon position
  disabled?: boolean; // Whether the button is disabled
  style?: ViewStyle; // Additional custom styles
  onFocus?: () => void; // Handler for button focus
  onBlur?: () => void; // Handler for button blur
  className?: string; // Additional class names
}

const Button: FC<ButtonProps> = ({
  title,
  onPress,
  size = "medium",
  variant = "base",
  color = "primary",
  icon,
  iconPosition = "left",
  disabled = false,
  style,
  onFocus,
  onBlur,
  className,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Tailwind-inspired color classes based on the provided color palette
  const colorClasses = {
    primary: {
      base: "bg-primary-main text-white",
      outlined: "border-primary-main text-primary-main",
      disabled: "bg-primary-light text-gray-500",
    },
    secondary: {
      base: "bg-secondary-main text-white",
      outlined: "border-secondary-main text-secondary-main",
      disabled: "bg-secondary-light text-gray-500",
    },
    success: {
      base: "bg-success-main text-white",
      outlined: "border-success-main text-success-main",
      disabled: "bg-success-light text-gray-500",
    },
    error: {
      base: "bg-error-main text-white",
      outlined: "border-error-main text-error-main",
      disabled: "bg-error-light text-gray-500",
    },
    info: {
      base: "bg-info-main text-white",
      outlined: "border-info-main text-info-main",
      disabled: "bg-info-light text-gray-500",
    },
    warning: {
      base: "bg-warning-main text-white",
      outlined: "border-warning-main text-warning-main",
      disabled: "bg-warning-light text-gray-500",
    },
  };

  // Size-specific styles with scaling
  const sizeStyles = {
    small: {
      paddingVertical: verticalScale(8),
      paddingHorizontal: scale(10),
      fontSize: moderateScale(14),
      iconSize: moderateScale(18),
    },
    medium: {
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(12),
      fontSize: moderateScale(16),
      iconSize: moderateScale(20),
    },
    large: {
      paddingVertical: verticalScale(14),
      paddingHorizontal: scale(16),
      fontSize: moderateScale(18),
      iconSize: moderateScale(24),
    },
  };

  const { paddingVertical, paddingHorizontal, fontSize, iconSize } =
    sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      className={clsx(
        "flex-row items-center justify-center rounded-md",
        disabled
          ? colorClasses[color].disabled
          : isFocused
          ? "ring-2 ring-primary-light" // Focused state
          : variant === "outlined"
          ? `border-2 ${colorClasses[color].outlined}`
          : variant === "contained"
          ? `${colorClasses[color].base}`
          : "bg-transparent",
        disabled && "opacity-50", className
      )}
      style={{
        paddingVertical,
        paddingHorizontal,
        ...style,
      }}
    >
      {/* Icon on the Left */}
      {icon && iconPosition === "left" && (
        <Ionicons
          name={icon}
          size={iconSize} // Icon size based on scaling
          color={
            disabled
              ? colorClasses[color].disabled.split(" ")[1]
              : variant === "contained"
              ? "white"
              : colorClasses[color].outlined.split(" ")[1]
          }
          style={{ marginRight: scale(8) }} // Horizontal scaling
        />
      )}

      {/* Button Text */}
      <Typography
        className={clsx(
          "font-oxanium-medium",
          disabled
            ? colorClasses[color].disabled.split(" ")[1]
            : variant === "outlined" || variant === "base"
            ? colorClasses[color].outlined.split(" ")[1]
            : "text-white"
        )}
        style={{
          fontSize, // Font size scaling
        }}
      >
        {title}
      </Typography>

      {/* Icon on the Right */}
      {icon && iconPosition === "right" && (
        <Ionicons
          name={icon}
          size={iconSize} // Icon size based on scaling
          color={
            disabled
              ? colorClasses[color].disabled.split(" ")[1]
              : variant === "contained"
              ? "white"
              : colorClasses[color].outlined.split(" ")[1]
          }
          style={{ marginLeft: scale(8) }} // Horizontal scaling
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
