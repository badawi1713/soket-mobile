import Logo from '@/assets/images/logo-pln-np.svg';
import AppBar from '@/components/AppBar';
import Card from '@/components/Card';
import Typography from '@/components/Typography';
import { default as Icon, default as Ionicons } from '@react-native-vector-icons/ionicons';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';

const MEASURED_KPI = [
	{
		title: 'NPHR-LHV',
		value: 3444,
		unit: 'kcal/kWh',
	},
	{
		title: 'NPHR-HHV',
		value: 4550,
		unit: 'kcal/kWh',
	},
	{
		title: 'Net Power',
		value: 4452,
		unit: 'MW',
	},
	{
		title: 'Gross Power',
		value: 288,
		unit: 'MW',
	},
	{
		title: 'Gross Eff',
		value: '60%',
		unit: '',
	},
	{
		title: 'GPHR',
		value: 450,
		unit: 'kcal/kWh',
	},
	{
		title: 'Fuel Flow',
		value: 200,
		unit: 't/h',
	},
	{
		title: 'Aux Power',
		value: 15000,
		unit: 'MW',
	},
];

const HEAT_BALANCE_KPI = [
	{
		title: 'NPHR-LHV',
		value: 3450,
		unit: 'kcal/kWh',
	},
	{
		title: 'NPHR-HHV',
		value: 4550,
		unit: 'kcal/kWh',
	},
	{
		title: 'Net Power',
		value: 4452,
		unit: 'MW',
	},
	{
		title: 'Gross Power',
		value: 288,
		unit: 'MW',
	},
	{
		title: 'Gross Eff',
		value: '60%',
		unit: '',
	},
	{
		title: 'GPHR',
		value: 450,
		unit: 'kcal/kWh',
	},
	{
		title: 'Fuel Flow',
		value: 200,
		unit: 't/h',
	},
	{
		title: 'Aux Power',
		value: 15000,
		unit: 'MW',
	},
];

const Screen = () => {
	return (
		<View className="bg-background-main flex-1">
			<AppBar
				leftComponent={<Logo width={scale(120)} />}
				rightComponent={
					<Typography weight="bold" variant="body2">
						Efficiency Optimization
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
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Measured KPI</Typography>
					<View className="flex-row justify-between gap-y-4 flex-wrap w-full">
						{MEASURED_KPI?.map((item, index) => (
							<Card
								key={item.title}
								style={{
									alignItems: 'center',
									paddingVertical: 4,
									paddingHorizontal: 8,
									justifyContent: 'space-between',
									gap: 12,
									backgroundColor: index === 0 ? COLORS.secondary.light : 'transparent',
									width: scale(68),
								}}
							>
								<Typography className="text-center" variant="smallText">
									{item?.title}
								</Typography>
								<Typography className="text-center" variant="header6" weight="medium">
									{item?.value || 0}
								</Typography>
								<Typography className="text-center" color={COLORS.secondary.main} variant="smallText">
									{item?.unit}
								</Typography>
							</Card>
						))}
					</View>
				</View>
				<View className="flex-col gap-4 bg-background-paper p-4 rounded-lg">
					<Typography weight="semibold">Heat Balance KPI</Typography>
					<View className="flex-row justify-between gap-y-4 flex-wrap w-full">
						{HEAT_BALANCE_KPI?.map((item, index) => (
							<Card
								key={item.title}
								style={{
									alignItems: 'center',
									paddingVertical: 4,
									paddingHorizontal: 8,
									justifyContent: 'space-between',
									gap: 12,
									backgroundColor: index === 0 ? COLORS.secondary.light : 'transparent',
									width: scale(68),
								}}
							>
								<Typography className="text-center" variant="smallText">
									{item?.title}
								</Typography>
								<Typography className="text-center" variant="header6" weight="medium">
									{item?.value || 0}
								</Typography>
								<Typography className="text-center" color={COLORS.secondary.main} variant="smallText">
									{item?.unit}
								</Typography>
							</Card>
						))}
					</View>
				</View>
				<TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-lg">
					<Typography variant="body2" weight="medium">
						Performance and Efficiency
					</Typography>
					<Icon size={18} name="arrow-up-right-box-outline" />
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default Screen;
