import {COLORS} from '@/constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Skeleton from './Skeleton';
import Typography from './Typography';

const LastUpdatedInfo = ({value = '', loading = false}) => {
  return (
    <View className="flex-row items-center gap-2 mx-auto mt-4">
      {loading ? (
        <Skeleton width={'100%'} height={scale(16)} />
      ) : (
        <>
          <View
            style={{
              transform: [{rotate: '90deg'}],
            }}>
            <Ionicons
              name="refresh-outline"
              color={COLORS.light.icon}
              size={18}
            />
          </View>

          <Typography
            variant="caption"
            className="text-center text-neutral-600">
            Last Updated: {value || '-'}
          </Typography>
        </>
      )}
    </View>
  );
};

export default LastUpdatedInfo;
