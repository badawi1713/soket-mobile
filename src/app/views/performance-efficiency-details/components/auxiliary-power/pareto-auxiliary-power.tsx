import BarChart from '@/components/BarChart';
import clsx from 'clsx';
import React from 'react';
import { Platform, View } from 'react-native';

const ParetoAuxiliaryPower = () => {
	const isIos = Platform.OS === 'ios';

	return (
		<View className={clsx(isIos ? 'p-4' : 'p-0', 'flex-1 bg-background-paper')}>
			<View style={{ flex: 1, minHeight: 640, overflow: 'hidden', borderRadius: isIos ? 8 : 0 }}>
				<BarChart />
			</View>
		</View>
	);
};

export default ParetoAuxiliaryPower;
