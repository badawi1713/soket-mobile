import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Button from './Button'; // Assuming you have the Button component ready
import Ionicons from '@react-native-vector-icons/ionicons';

interface ButtonGroupProps {
  buttons: {
    title: string;
    onPress: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'outlined' | 'contained' | 'base';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    icon?: React.ComponentProps<typeof Ionicons>['name'];
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
  }[];
  direction?: 'row' | 'column'; // Group direction
  gap?: number; // Space between buttons
  style?: ViewStyle; // Additional custom styles
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  buttons,
  direction = 'row',
  gap = 8,
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        { flexDirection: direction, gap }, // Direction and gap styling
        style,
      ]}
    >
      {buttons.map((button, index) => (
        <Button
          key={index}
          title={button.title}
          onPress={button.onPress}
          size={button.size}
          variant={button.variant}
          color={button.color}
          icon={button.icon}
          iconPosition={button.iconPosition}
          disabled={button.disabled}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonGroup;
