import React from 'react';
import { View } from 'react-native';
import Typography from './Typography';

const CommingSoon = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center">
        <Typography
          variant="header6"
          className="font-oxanium-semibold text-center">
          Sorry, Screen is Under Development
        </Typography>
      </View>
    </>
  );
};

export default CommingSoon;
