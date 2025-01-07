import BarChart from '@/components/BarChart';
import React from 'react';
import { View } from 'react-native';

const ParetoHeatLosses = () => {
	return (
		<View className="p-4 flex-1 bg-background-paper">
			<View style={{ flex: 1, minHeight: 640, overflow: 'hidden', borderRadius: 8 }}>
				<BarChart />
			</View>
		</View>
	);
};

export default ParetoHeatLosses;
