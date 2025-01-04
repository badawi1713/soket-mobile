import { COLORS } from '@/constants/colors'
import Ionicons from '@react-native-vector-icons/ionicons'
import React from 'react'
import { View } from 'react-native'
import Typography from './Typography'

const LastUpdatedInfo = ({value = ''}) => {
  return (
    <View className="flex-row items-center mx-auto gap-2 mt-4">
    <View
        style={{
            transform: [{ rotate: '90deg' }],
        }}
    >
        <Ionicons name="refresh-outline" color={COLORS.light.icon} size={18} />
    </View>
    <Typography variant="caption" className="text-center text-neutral-600">
        Last Updated: {value || '-'}
    </Typography>
</View>
  )
}

export default LastUpdatedInfo