import { COLORS } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

const BottomTabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const activeTabAnimation = useRef(new Animated.Value(0)).current;
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});

  useEffect(() => {
    if (tabLayouts[state.index]) {
      Animated.timing(activeTabAnimation, {
        toValue: tabLayouts[state.index].x,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [state.index, tabLayouts]);

  const handleTabLayout = (index: number) => (event: any) => {
    const { x, width } = event.nativeEvent.layout;
    setTabLayouts((prev) => ({
      ...prev,
      [index]: { x, width },
    }));
  };

  return (
    <View style={styles.tabBarContainer}>
      {tabLayouts[state.index] && (
        <Animated.View
          style={[
            styles.activeBorder,
            {
              width: tabLayouts[state.index]?.width || 0,
              transform: [{ translateX: activeTabAnimation }],
            },
          ]}
        />
      )}

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          `${options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? 'options.title'
            : route.name}`.replace(/-/g, ' ').replace('boiler', '');

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = (): React.ComponentProps<typeof Ionicons>['name'] => {
          switch (route.name) {
            case 'dashboard':
              return isFocused ? 'grid' : 'grid-outline';
            case 'reliability':
              return isFocused ? 'shield-checkmark' : 'shield-checkmark-outline';
            case 'efficiency':
              return isFocused ? 'speedometer' : 'speedometer-outline';
            case 'boiler-auto-tuning':
              return isFocused ? 'cog' : 'cog-outline';
            case 'others':
              return isFocused ? 'menu' : 'menu-outline';
            default:
              return 'navigate';
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            onLayout={handleTabLayout(index)}
          >
            <Ionicons
              name={iconName()}
              size={scale(20)}
              color={isFocused ? COLORS.primary.main : COLORS.secondary.main}
            />
            <Typography
              variant="caption"
              className={clsx(
                `capitalize text-center font-oxanium-medium`,
                isFocused ? 'text-primary-main' : 'text-secondary-main'
              )}
            >
              {typeof label === 'string' ? label : 'Label'}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background.paper,
    borderTopWidth: 1,
    borderTopColor: COLORS.border.light,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: verticalScale(60),
  },
  activeBorder: {
    position: 'absolute',
    top: 0,
    height: 4,
    backgroundColor: COLORS.primary.main,
    zIndex: 1,
  },
});
