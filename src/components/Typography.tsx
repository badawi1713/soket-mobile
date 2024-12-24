import { clsx } from "clsx";
import React, { type FC, type ReactNode } from "react";
import { Text, type TextProps } from "react-native";

interface TypographyProps extends TextProps {
  variant?:
    | "caption"
    | "label"
    | "body2"
    | "body1"
    | "header1"
    | "header2"
    | "header3"
    | "header4"
    | "header5"
    | "header6"
    | "subtitle"
    | "title"; // Font variant
  weight?:
    | "regular"
    | "bold"
    | "extrabold"
    | "medium"
    | "semibold"
    | "light"
    | "extralight"; // Font weight
  color?: string; // Inline color
  className?: string; // Utility classes for NativeWind
  children: ReactNode; // Child text
}

const Typography: FC<TypographyProps> = ({
  variant = "body1",
  weight = "regular",
  color,
  className,
  children,
  ...props
}) => {
  // Map variants to font sizes
  const variantStyles: Record<string, string> = {
    caption: "text-sm",
    label: "text-base",
    body2: "text-base",
    body1: "text-lg",
    header6: "text-xl",
    header5: "text-2xl",
    header4: "text-3xl",
    header3: "text-4xl",
    header2: "text-5xl",
    header1: "text-6xl",
    subtitle: "text-lg",
    title: "text-2xl",
  };

  // Map weights to font classes
  const weightStyles: Record<string, string> = {
    regular: "font-oxanium",
    bold: "font-oxanium-bold",
    extrabold: "font-oxanium-extrabold",
    medium: "font-oxanium-medium",
    semibold: "font-oxanium-semibold",
    light: "font-oxanium-light",
    extralight: "font-oxanium-extralight",
  };

  return (
    <Text
      {...props}
      className={clsx(
        variantStyles[variant], // Font size
        weightStyles[weight], // Font weight
        className // Utility classes from parent
      )}
      style={color ? [{ color }, props.style] : props.style} // Inline color if provided
    >
      {children}
    </Text>
  );
};

export default Typography;
