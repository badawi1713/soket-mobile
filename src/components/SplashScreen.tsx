import Logo from '@/assets/images/logo-pln-np.svg'
import { COLORS } from '@//constants/colors'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { verticalScale } from 'react-native-size-matters'

const SplashScreen = () => {
  return (
    <View className='flex-1 bg-white justify-center items-center'>
        <Logo width="80%" height={verticalScale(180)} />
        <ActivityIndicator size="large" color={COLORS.primary.main} />
    </View>
  )
}

export default SplashScreen