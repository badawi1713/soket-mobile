import { COLORS } from '@/constants/colors';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: object;
};

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style = {},
}) => {
  const shimmerValue = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerValue, {
        toValue: 2,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerValue]);

  const shimmerTranslate = shimmerValue.interpolate({
    inputRange: [-1, 1, 2],
    outputRange: [-screenWidth, 0, screenWidth],
  });

  return (
    <View
      style={[
        styles.shimmerWrapper,
        { width, height, borderRadius },
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.shimmerGradient,
          { transform: [{ translateX: shimmerTranslate }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  shimmerWrapper: {
    backgroundColor: COLORS.neutral.main,
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 253, 0.9)',
    opacity: 0.5,
  },
});

export default Skeleton;
