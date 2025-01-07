import Ionicons from '@react-native-vector-icons/ionicons';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Divider from './Divider';
import Typography from './Typography';

type AccordionData = {
  title: string;
  subtitle?: string;
  children: JSX.Element;
  expanded: boolean;
  onHeaderPress: () => void;
  isLast?: boolean;
  index?: number;
};

function AccordionItem({
  children,
  title,
  subtitle,
  expanded,
  onHeaderPress,
}: AccordionData): JSX.Element {
  const body = <>{children}</>;

  const rotationValue = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(rotationValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolation = rotationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className={clsx(expanded ? 'flex-1' : 'shrink-0')}>
      <TouchableOpacity
        className={clsx(
          'py-3 flex-row items-center px-3 bg-background-paper',
        )}
        onPress={() => {
          onHeaderPress();
          startRotation();
        }}>
        <View className='flex-row items-center'>
          <Animated.View style={{transform: [{rotate: rotateInterpolation}]}}>
            <Ionicons size={20} name="chevron-down-outline" />
          </Animated.View>
          <Typography variant="body2" className='ml-2' weight="bold">
            {title}
          </Typography>
        </View>
        <Typography variant="caption" className='ml-auto mr-2'>
            {subtitle || ''}
          </Typography>
      </TouchableOpacity>
      <Divider />
      {expanded && body}
    </View>
  );
}

export default AccordionItem;