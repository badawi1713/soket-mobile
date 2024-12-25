import React, { FC, ReactNode, useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

interface BlinkViewProps {
  className?: string; // TailwindCSS classes for styling
  duration?: number; // Duration of the blink animation in ms
  children?: ReactNode; // Child content inside the BlinkView
}

const BlinkView: FC<BlinkViewProps> = ({ className, duration = 1000, children }) => {
  // Shared value to control opacity
  const opacity = useSharedValue(1);

  // Set up the blinking animation
  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0, { duration: duration / 2 }), // Blink out
      -1, // Infinite repeat
      true // Reverse direction (blink in)
    );
  }, [opacity, duration]);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={animatedStyle}
    >
      {children}
    </Animated.View>
  );
};

export default BlinkView;
