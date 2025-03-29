import { COLORS } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

const BottomTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const activeTabAnimation = useRef(new Animated.Value(0)).current;
  const [tabLayouts, setTabLayouts] = useState<{
    [key: number]: {x: number; width: number};
  }>({});

  useEffect(() => {
    if (tabLayouts[state.index]) {
      Animated.timing(activeTabAnimation, {
        toValue: tabLayouts[state.index].x,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [state.index, tabLayouts]);

  const handleTabLayout = (index: number) => (event: LayoutChangeEvent) => {
    const {x, width} = event.nativeEvent.layout;
    setTabLayouts(prev => {
      if (prev[index]?.x === x && prev[index]?.width === width) return prev;
      return {...prev, [index]: {x, width}};
    });
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* Animated Active Tab Border */}
      {tabLayouts[state.index] && (
        <Animated.View
          style={[
            styles.activeBorder,
            {
              width: tabLayouts[state.index]?.width || 0,
              transform: [{translateX: activeTabAnimation}],
            },
          ]}
        />
      )}

      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const rawLabel = options.tabBarLabel ?? options.title ?? route.name;
        const label = String(rawLabel).replace(/-/g, ' ').replace('boiler', '');
        const isFocused = state.index === index;
        const iconColor = isFocused
          ? COLORS.primary.main
          : COLORS.secondary.main;
        const textColorClass = isFocused
          ? 'text-primary-main'
          : 'text-secondary-main';

        const iconName = useMemo(() => {
          switch (route.name) {
            case 'dashboard':
              return isFocused ? 'grid' : 'grid-outline';
            case 'reliability':
              return isFocused
                ? 'shield-checkmark'
                : 'shield-checkmark-outline';
            case 'efficiency':
              return isFocused ? 'speedometer' : 'speedometer-outline';
            case 'boiler-auto-tuning':
              return isFocused ? 'cog' : 'cog-outline';
            case 'others':
              return isFocused ? 'menu' : 'menu-outline';
            default:
              return 'navigate';
          }
        }, [route.name, isFocused]);

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

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
            onLayout={handleTabLayout(index)}>
            <Ionicons name={iconName} size={scale(20)} color={iconColor} />
            <Typography
              className={clsx(
                'capitalize text-center font-oxanium-medium text-xs',
                textColorClass,
              )}>
              {label}
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
    pointerEvents: 'none',
  },
});
