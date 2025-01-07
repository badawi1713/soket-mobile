import type { AuthNavigationProp } from '@/app/routes';
import BlinkView from '@/components/BlinkView';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import TextInput from '@/components/TextInput';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import images from '@/constants/images';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

type Unit = {
	id: string;
	title: string;
	status: 1 | 0 | true | false;
};

type UnitList = Unit[];

const data: UnitList = [
	{
		id: '1',
		title: 'Tanjung Awar-Awar - Unit 1',
		status: true,
	},
	{
		id: '2',
		title: 'Tanjung Awar-Awar - Unit 2',
		status: false,
	},
	{
		id: '3',
		title: 'Tenayan - Unit 1',
		status: true,
	},
	{
		id: '4',
		title: 'Tenayan - Unit 2',
		status: false,
	},
];

const Content = () => {
	const [keyword, setKeyword] = useState<string>('');

	const navigation = useNavigation<AuthNavigationProp>();

	const filteredData = useMemo(() => {
		return data.filter((item) => item.title.toLowerCase().includes(keyword.toLowerCase()));
	}, [keyword]);

	return (
		<View className="bg-background-paper flex-1">
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="px-4 pb-4 gap-4">
				<View className="flex-row justify-between gap-x-4">
					<Card
						title="12.0 GW"
						variant="primary"
						subtitle="Total Capacity"
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: COLORS.border.light,
							alignItems: 'center',
						}}
						icon="flash"
					/>
					<Card
						title="22.40 GW"
						variant="error"
						subtitle="Total Gross Load"
						style={{
							flex: 1,
							borderWidth: 1,
							borderColor: COLORS.border.light,
							alignItems: 'center',
						}}
						icon="trending-up"
					/>
				</View>
				<View>
					<TextInput
						size="small"
						placeholder="Search unit..."
						icon="search-outline"
						value={keyword}
						onChangeText={(e) => setKeyword(e)}
						iconPosition="right"
					/>
				</View>
				<LastUpdatedInfo value={format(new Date(), 'MMM dd, yyyy  HH:mm')} />
				{filteredData?.length < 1 ? <View className='items-center justify-center mt-4'>
					<Typography className='text-center' variant='body2'>No data found. Please try searching with a different keyword.</Typography>
				</View> : <View className="flex-row gap-0 gap-y-4 flex-wrap justify-between">
					{filteredData.map((item) => (
						<TouchableOpacity
							activeOpacity={0.3}
							key={item.id}
							onPress={() =>
								navigation.navigate('unit-details', {
									id: `${item.id}`,
									title: item.title,
								})
							}
							style={{ width: '48%' }}
						>
							<View className="h-32 rounded-md bg-slate-200 relative">
								<Image
									source={images.imgPlantExample}
									style={{ width: '100%', height: '100%' }}
									className="rounded-md"
									resizeMode="stretch"
								/>
								<View className="absolute top-2 left-2">
									{item.status ? (
										<Ionicons name="ellipse" color={item.status ? COLORS.success.main : COLORS.error.main} size={24} />
									) : (
										<BlinkView>
											<Ionicons
												name="ellipse"
												color={item.status ? COLORS.success.main : COLORS.error.main}
												size={24}
											/>
										</BlinkView>
									)}
								</View>
								<View className="absolute w-full bottom-0 rounded-b-md">
									<View className="bg-black opacity-55 z-10 rounded-b-md absolute w-full h-full" />
									<View className="px-2 py-1 z-20">
										<Typography className="text-white text-center font-oxanium-medium" variant="smallText">
											{item.title || 'Unknown imgPlantExample'}
										</Typography>
									</View>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>}
			</ScrollView>
		</View>
	);
};

export default Content;
