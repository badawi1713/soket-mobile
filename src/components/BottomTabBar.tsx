import { COLORS } from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import clsx from 'clsx';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import Typography from './Typography';

const BottomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
      <View style={styles.tabBarContainer}>
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
            >
              <Ionicons name={iconName()} size={scale(20)} color={isFocused ? COLORS.primary.main : COLORS.light.tabIconDefault} />
              <Typography variant="caption" className={clsx(`capitalize text-center font-oxanium-medium`, isFocused ? 'text-primary-main' : 'text-light-tabIconDefault')}>{typeof label === 'string'  ? label : 'Label'}</Typography>
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
    },
    tabButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      height: verticalScale(60)
    },
  });
