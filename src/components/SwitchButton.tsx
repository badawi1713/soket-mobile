import { COLORS } from '@/constants/colors';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface SwitchButtonProps {
  options: string[];
  onChange: (selected: string) => void;
  initialValue?: string;
  variant?: 'full' | 'none' | 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({
  options,
  onChange,
  initialValue = options[0],
  variant = 'small',
}) => {
  const [selected, setSelected] = useState(initialValue);
  const [tabLayouts, setTabLayouts] = useState<{ [key: number]: { x: number; width: number } }>({});
  const animatedValue = useRef(new Animated.Value(0)).current;

  const borderRadiusMap = {
    full: moderateScale(25),
    none: 0,
    small: moderateScale(8),
    medium: moderateScale(16),
    large: moderateScale(20),
  };

  const containerBorderRadius = borderRadiusMap[variant];
  const activeBorderRadius = borderRadiusMap[variant];

  useEffect(() => {
    const index = options.indexOf(selected);
    if (tabLayouts[index]) {
      Animated.timing(animatedValue, {
        toValue: tabLayouts[index].x,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [selected, tabLayouts]);

  const handlePress = (value: string, index: number) => {
    if (selected !== value) {
      setSelected(value);
      onChange(value);
    }
  };

  const handleTabLayout = (index: number) => (event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => {
      if (prev[index]?.x === x && prev[index]?.width === width) return prev;
      return {
        ...prev,
        [index]: { x, width },
      };
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: containerBorderRadius,
        },
      ]}
    >
      {tabLayouts[options.indexOf(selected)] && (
        <Animated.View
          style={[
            styles.activeBackground,
            {
              width: tabLayouts[options.indexOf(selected)]?.width || 0,
              transform: [{ translateX: animatedValue }],
              borderRadius: activeBorderRadius,
            },
          ]}
        />
      )}
      {options.map((option, index) => (
        <TouchableOpacity
          key={option}
          style={styles.button}
          onPress={() => handlePress(option, index)}
          onLayout={handleTabLayout(index)}
        >
          <Text
            style={[
              styles.buttonText,
              selected === option && styles.activeText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: COLORS.secondary.light,
    padding: 4,
    height: moderateScale(40),
    alignItems: 'center',
  },
  activeBackground: {
    position: 'absolute',
    height: moderateScale(32),
    backgroundColor: COLORS.primary.main,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    flex: 1,
  },
  buttonText: {
    fontSize: moderateScale(14),
    color: COLORS.common.black,
  },
  activeText: {
    color: COLORS.common.white,
    fontWeight: 'bold',
  },
});

export default SwitchButton;
