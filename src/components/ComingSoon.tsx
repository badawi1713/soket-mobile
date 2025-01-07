import React from 'react';
import { View } from 'react-native';
import Typography from './Typography';

const CommingSoon = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Typography
          variant="body2"
          className="font-oxanium-semibold text-gray-600 text-center">
          Sorry, content is under development
        </Typography>
      </View>
    </>
  );
};

export default CommingSoon;
