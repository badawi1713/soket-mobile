import { COLORS } from '@/constants/colors'; // Use your colors constants
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface DividerProps {
  color?: string; // Color of the divider
  thickness?: number; // Thickness of the divider
  orientation?: 'horizontal' | 'vertical'; // Orientation of the divider
  style?: StyleProp<ViewStyle>; // Additional custom styles
}

const Divider: React.FC<DividerProps> = ({
  color = COLORS.neutral.main, // Default color
  thickness = 1, // Default thickness
  orientation = 'horizontal', // Default orientation
  style,
}) => {
  return (
    <View
      style={[
        orientation === 'horizontal'
          ? { height: thickness, width: '100%' } // Horizontal divider
          : { width: thickness, height: '100%' }, // Vertical divider
        { backgroundColor: color }, // Divider color
        style, // Additional custom styles
      ]}
    />
  );
};

export default Divider;
