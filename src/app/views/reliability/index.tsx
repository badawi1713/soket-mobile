import Logo from '@/assets/images/logo-pln-np.svg';
import AppBar from '@/components/AppBar';
import GaugeChart from '@/components/GaugeChart';
import MenuItems from '@/components/MenuItems';
import Typography from '@/components/Typography';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { format } from 'date-fns';
import Ionicons from '@react-native-vector-icons/ionicons';
import { COLORS } from '../../../constants/colors';
import TextInput from '@/components/TextInput';
import Card from '@/components/Card';

const Screen = () => {
	const { width } = Dimensions.get('window');

	return (
		<View className="bg-background-main flex-1">
			<AppBar
				leftComponent={<Logo width={scale(120)} />}
				rightComponent={
					<Typography weight="bold" variant="body2">
						Reliability Optimization
					</Typography>
				}
			/>
			<View className="bg-background-paper h-auto px-4 pb-4">
				<View className="h-12 bg-gray-200 rounded-lg" />
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
				<View className="flex-row items-center mx-auto gap-2 mt-4">
					<View
						style={{
							transform: [{ rotate: '90deg' }],
						}}
					>
						<Ionicons name="refresh-outline" color={COLORS.light.icon} size={18} />
					</View>
					<Typography variant="caption" className="text-center text-neutral-600">
						Last Updated: {format(new Date(), 'MMM dd, yyyy  HH:mm')}
					</Typography>
				</View>
				<View className="flex-col gap-4 rounded-lg">
					<View style={[styles.chartContainer]}>
						<GaugeChart title="Asset Health Indicator" />
					</View>
					<View style={[styles.chartContainer]}>
						<GaugeChart title="Reliability Indicator" />
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Anomaly Detection</Typography>
					<View className="flex-row justify-between gap-x-4">
						<Card
							title="0"
							variant="error"
							subtitle="NEW"
							style={{
								flex: 1,
								borderWidth: 1,
								borderColor: COLORS.border.light,
								alignItems: 'center',
							}}
						/>
						<Card
							title="20"
							variant="info"
							subtitle="OPEN"
							style={{
								flex: 1,
								borderWidth: 1,
								borderColor: COLORS.border.light,
								alignItems: 'center',
							}}
						/>
					</View>
					<View className="flex-row justify-between flex-wrap gap-x-0">
						<Card
							title="30"
							variant="default"
							subtitle="AWAITING"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="50"
							variant="default"
							subtitle="IN PROGRESS"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="80"
							variant="default"
							subtitle="COMPLETED"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="120"
							variant="default"
							subtitle="CLOSED"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Failure Detection</Typography>
					<View className="flex-row justify-between gap-x-4">
						<Card
							title="0"
							variant="error"
							subtitle="NEW"
							style={{
								flex: 1,
								borderWidth: 1,
								borderColor: COLORS.border.light,
								alignItems: 'center',
							}}
						/>
						<Card
							title="20"
							variant="info"
							subtitle="OPEN"
							style={{
								flex: 1,
								borderWidth: 1,
								borderColor: COLORS.border.light,
								alignItems: 'center',
							}}
						/>
					</View>
					<View className="flex-row justify-between flex-wrap gap-x-0">
						<Card
							title="30"
							variant="default"
							subtitle="AWAITING"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="50"
							variant="default"
							subtitle="IN PROGRESS"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="80"
							variant="default"
							subtitle="COMPLETED"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							title="120"
							variant="default"
							subtitle="CLOSED"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

export default Screen;

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		height: 240,
		overflow: 'hidden',
		borderRadius: 8,
	},
});
