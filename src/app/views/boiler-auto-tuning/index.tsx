import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Typography from '@/components/Typography';
import { default as Ionicons } from '@react-native-vector-icons/ionicons';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import EfficiencyChart from './components/EfficiencyChart';

const EFF_STATUS = [
	{
		title: 'Baseline',
		value: '80%',
	},
	{
		title: 'Current',
		value: '82.5%',
	},
	{
		title: 'Improvement',
		value: '2.5%',
	},
];

const SOOTBLOW_STATUS = [
	{
		title: 'Status',
		value: 'ON',
	},
	{
		title: 'Operation',
		value: 'Auto',
	},
	{
		title: 'Master',
		value: 'ON',
	},
	{
		title: 'Safeguard',
		value: 'Ready',
	},
];

const COMBUSTION_STATUS = [
	{
		title: 'Status',
		value: 'ON',
	},
	{
		title: 'Operation',
		value: 'Manual',
	},
	{
		title: 'Master',
		value: 'OFF',
	},
	{
		title: 'Safeguard',
		value: 'Not Ready',
	},
];

const Content = () => {
	return (
		<View className="bg-background-main flex-1">
			<View className="bg-background-paper h-auto px-4 pb-4">
				<View className="h-12">
					<Autocomplete />
				</View>
			</View>
			<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 16, paddingBottom: 16 }}>
				<LastUpdatedInfo value={format(new Date(), 'MMM dd, yyyy  HH:mm')} />
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Efficiency Status</Typography>
					<View className="flex-row justify-between gap-y-4 flex-wrap w-full">
						{EFF_STATUS?.map((item) => (
							<Card
								key={item?.title}
								style={{
									alignItems: 'center',
									paddingVertical: 4,
									paddingHorizontal: 12,
									justifyContent: 'space-between',
									gap: 12,
									backgroundColor: item?.title
										? `${item?.title}`.includes('Improvement')
											? COLORS.success.main
											: 'transparent'
										: 'transparent',
								}}
							>
								<Typography
									className={`${item?.title}`.includes('Improvement') ? 'text-white' : ''}
									variant="body2"
									weight="medium"
								>
									{item?.title}
								</Typography>
								<Typography
									className={`${item?.title}`.includes('Improvement') ? 'text-white' : ''}
									variant="body2"
									weight="bold"
								>
									{item?.value || 0}
								</Typography>
							</Card>
						))}
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Efficiency Chart</Typography>
					<View className="bg-slate-200 w-full">
						<EfficiencyChart />
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Sootblow Optimization</Typography>
					<View className="flex-row justify-between gap-y-4 flex-wrap w-full">
						{SOOTBLOW_STATUS?.map((item) => (
							<Card
								key={item?.title}
								style={{
									alignItems: 'center',
									paddingVertical: 4,
									paddingHorizontal: 2,
									justifyContent: 'space-between',
									gap: 12,
									backgroundColor: item?.value
										? `${item?.value}`.includes('ON') ||
											(`${item?.value}`.toLowerCase().includes('auto') &&
												!`${item?.value}`.toLowerCase().includes('not ready'))
											? COLORS.success.main
											: COLORS.error.main
										: COLORS.error.main,
									width: scale(70),
								}}
							>
								<Typography className="text-center text-white" variant="smallText" weight="medium">
									{item?.title}
								</Typography>
								<Typography className="text-center text-white" variant="caption" weight="bold">
									{item?.value || 0}
								</Typography>
							</Card>
						))}
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Combustion Optimization</Typography>
					<View className="flex-row justify-between gap-y-4 flex-wrap w-full">
						{COMBUSTION_STATUS?.map((item) => (
							<Card
								key={item?.title}
								style={{
									alignItems: 'center',
									paddingVertical: 4,
									paddingHorizontal: 2,
									justifyContent: 'space-between',
									gap: 12,
									backgroundColor: item?.value
										? `${item?.value}`.includes('ON') ||
											(`${item?.value}`.toLowerCase().includes('auto') &&
												!`${item?.value}`.toLowerCase().includes('not ready'))
											? COLORS.success.main
											: COLORS.error.main
										: COLORS.error.main,
									width: scale(70),
								}}
							>
								<Typography className="text-center text-white" variant="smallText" weight="medium">
									{item?.title}
								</Typography>
								<Typography className="text-center text-white" variant="caption" weight="bold">
									{item?.value || 0}
								</Typography>
							</Card>
						))}
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
		height: 240,
		overflow: 'hidden',
		borderRadius: 8,
	},
});
