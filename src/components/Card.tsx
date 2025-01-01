import { COLORS } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import React, { FC, ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Typography from './Typography';

interface CardProps {
  title?: string; // Card title
  subtitle?: string; // Optional subtitle
  icon?: React.ComponentProps<typeof Ionicons>['name']; // Optional leading icon
  variant?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'; // Card variant for colors
  children?: ReactNode; // Content inside the card
  style?: StyleProp<ViewStyle>; // Custom styles
  shadow?: boolean; // Whether to apply shadow
}

const Card: FC<CardProps> = ({
  title,
  subtitle,
  icon,
  variant = 'default',
  children,
  style,
  shadow = false,
}) => {
  // Variant-specific colors
  const variantColors = {
    default: {
      background: COLORS.background.paper,
      title: COLORS.light.icon,
      subtitle: COLORS.light.icon,
    },
    primary: {
      background: COLORS.background.paper,
      title: COLORS.primary.dark,
      subtitle: COLORS.primary.main,
    },
    success: {
      background: COLORS.background.paper,
      title: COLORS.success.dark,
      subtitle: COLORS.success.main,
    },
    info: {
      background: COLORS.background.paper,
      title: COLORS.info.dark,
      subtitle: COLORS.info.main,
    },
    warning: {
      background: COLORS.background.paper,
      title: COLORS.warning.dark,
      subtitle: COLORS.warning.main,
    },
    error: {
      background: COLORS.background.paper,
      title: COLORS.error.dark,
      subtitle: COLORS.error.main,
    },
  };

  const colors = variantColors[variant];

  return (
    <View
      style={[
        {
          backgroundColor: colors.background,
          padding: 16,
          borderRadius: 8,
        },
        shadow && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 5, // For Android
        },
        style,
      ]}
    >
      {/* Header Section */}
     {title && <View className="flex-row items-center mb-4">
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color={colors.title}
            style={{ marginRight: 8 }}
          />
        )}
        <Typography variant="header5" weight="bold" color={colors.title}>
          {title}
        </Typography>
      </View>}

      {/* Subtitle Section */}
      {subtitle && (
        <Typography
          variant="caption"
          weight="semibold"
          color={colors.subtitle}
          className='text-center'
        >
          {subtitle}
        </Typography>
      )}

      {/* Children (Card Content) */}
      {children}
    </View>
  );
};

export default Card;
