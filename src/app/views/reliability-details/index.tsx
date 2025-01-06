import BarChart from '@/components/BarChart';
import Typography from '@/components/Typography';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Content = () => {
	const { bottom } = useSafeAreaInsets();

	return (
		<View className="bg-background-main flex-1">
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					gap: 16,
					paddingHorizontal: 16,
					paddingTop: 16,
					paddingBottom: bottom || 16,
				}}
			>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Bad Actor</Typography>
					<View style={[styles.chartContainer]}>
						<BarChart />
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Content;

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		minHeight: 640,
		overflow: 'hidden',
		borderRadius: 8,
	},
});
