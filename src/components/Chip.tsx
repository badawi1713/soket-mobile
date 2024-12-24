import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import React, { FC } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Typography from "./Typography";

interface ChipProps {
  text: string; // Chip label
  onPress?: () => void; // Action when the chip is pressed
  onClose?: () => void; // Action when close icon is pressed
  size?: "small" | "medium" | "large"; // Size of the chip
  variant?: "contained" | "outlined"; // Style of the chip
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"; // Color variant
  icon?: keyof typeof Ionicons.glyphMap; // Optional leading icon
  style?: StyleProp<ViewStyle>; // Additional custom styles
}

const Chip: FC<ChipProps> = ({
  text,
  onPress,
  onClose,
  size = "medium",
  variant = "contained",
  color = "primary",
  icon,
  style,
}) => {
  // Tailwind-inspired color classes based on the provided color palette
  const colorClasses = {
    primary: {
      base: "bg-primary-main text-white",
      outlined: "border-primary-main text-primary-main",
    },
    secondary: {
      base: "bg-secondary-main text-white",
      outlined: "border-secondary-main text-secondary-main",
    },
    success: {
      base: "bg-success-main text-white",
      outlined: "border-success-main text-success-main",
    },
    error: {
      base: "bg-error-main text-white",
      outlined: "border-error-main text-error-main",
    },
    info: {
      base: "bg-info-main text-white",
      outlined: "border-info-main text-info-main",
    },
    warning: {
      base: "bg-warning-main text-white",
      outlined: "border-warning-main text-warning-main",
    },
  };

  // Define size styles
  const sizeStyles = {
    small: {
      paddingVertical: verticalScale(4),
      paddingHorizontal: scale(8),
      fontSize: moderateScale(12),
      iconSize: moderateScale(14),
    },
    medium: {
      paddingVertical: verticalScale(6),
      paddingHorizontal: scale(12),
      fontSize: moderateScale(14),
      iconSize: moderateScale(16),
    },
    large: {
      paddingVertical: verticalScale(8),
      paddingHorizontal: scale(16),
      fontSize: moderateScale(16),
      iconSize: moderateScale(20),
    },
  };

  const { paddingVertical, paddingHorizontal, fontSize, iconSize } =
    sizeStyles[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className={clsx(
        "flex-row items-center rounded-full",
        variant === "contained"
          ? `${colorClasses[color].base}`
          : `border ${colorClasses[color].outlined}`
      )}
      style={[
        {
          paddingVertical,
          paddingHorizontal,
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
            variant === "contained"
              ? "white"
              : colorClasses[color].outlined.split(" ")[1]
          }
          style={{ marginRight: scale(8) }}
        />
      )}

      {/* Chip Text */}
      <Typography
        className={clsx(
          "font-medium",
          variant === "contained" ? "text-white" : colorClasses[color].outlined
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
              variant === "contained"
                ? "white"
                : colorClasses[color].outlined.split(" ")[1]
            }
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default Chip;
