import type { AuthNavigationProp } from '@/app/routes';
import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import GaugeChart from '@/components/GaugeChart';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Content = () => {
	const navigation = useNavigation<AuthNavigationProp>();

	return (
		<View className="bg-background-main flex-1">
			<View className="bg-background-paper h-auto px-4 pb-4">
				<View className="h-12">
					<Autocomplete />
				</View>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
				<LastUpdatedInfo value={format(new Date(), 'MMM dd, yyyy  HH:mm')} />
				<View className="flex-col gap-4 rounded-lg">
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('reliability-details', {
								id: '1',
								title: 'Asset Health',
								subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
							})
						}
						style={[styles.chartContainer]}
					>
						<GaugeChart title="Asset Health Indicator" />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('reliability-details', {
								id: '1',
								title: 'Reliability Analysis',
								subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
							})
						}
						style={[styles.chartContainer]}
					>
						<GaugeChart title="Reliability Indicator" />
					</TouchableOpacity>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Anomaly Detection</Typography>
					<View className="flex-row justify-between gap-x-4">
						<Card
							onPress={() =>
								navigation.navigate('case-details', {
									title: 'Anomaly Detection',
									subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
									type: 'open',
								})
							}
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
							onPress={() =>
								navigation.navigate('case-details', {
									title: 'Anomaly Detection',
									subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
									type: 'completed',
								})
							}
							title="20"
							variant="success"
							subtitle="COMPLETED"
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
							onPress={() =>
								navigation.navigate('case-details', {
									title: 'Anomaly Detection',
									subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
									type: 'awaiting',
								})
							}
							title="30"
							variant="default"
							subtitle="AWAITING"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							onPress={() =>
								navigation.navigate('case-details', {
									title: 'Anomaly Detection',
									subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
									type: 'in-progress',
								})
							}
							title="50"
							variant="default"
							subtitle="IN PROGRESS"
							style={{
								alignItems: 'center',
								padding: 0,
							}}
						/>
						<Card
							onPress={() =>
								navigation.navigate('case-details', {
									title: 'Anomaly Detection',
									subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
									type: 'closed',
								})
							}
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
				{false && (
					<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
						<Typography weight="semibold">Failure Prediction</Typography>
						<View className="flex-row justify-between gap-x-4">
							<Card
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'open',
									})
								}
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
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'open',
									})
								}
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
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'awaiting',
									})
								}
								title="30"
								variant="default"
								subtitle="AWAITING"
								style={{
									alignItems: 'center',
									padding: 0,
								}}
							/>
							<Card
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'in-progress',
									})
								}
								title="50"
								variant="default"
								subtitle="IN PROGRESS"
								style={{
									alignItems: 'center',
									padding: 0,
								}}
							/>
							<Card
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'completed',
									})
								}
								title="80"
								variant="default"
								subtitle="COMPLETED"
								style={{
									alignItems: 'center',
									padding: 0,
								}}
							/>
							<Card
								onPress={() =>
									navigation.navigate('case-details', {
										title: 'Failure Prediction',
										subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
										type: 'closed',
									})
								}
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
				)}
			</ScrollView>
		</View>
	);
};

export default Content;

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		height: 240,
		overflow: 'hidden',
		borderRadius: 8,
	},
});
