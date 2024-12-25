import Logo from '@/assets/images/logo-pln-np.svg';
import React from 'react';
import {View} from 'react-native';
import {scale} from 'react-native-size-matters';
import AppBar from './AppBar';
import MenuItems from './MenuItems';
import Typography from './Typography';

const ComingSoon = () => {
  return (
    <>
      <AppBar
        leftComponent={<Logo width={scale(120)} />}
        rightComponent={<MenuItems />}
      />
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

export default ComingSoon;
