import BlinkView from '@/components/BlinkView';
import Card from '@/components/Card';
import TextInput from '@/components/TextInput';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import images from '@/constants/images';
import Ionicons from '@react-native-vector-icons/ionicons';
import { format } from 'date-fns';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

const Content = () => {
	return (
		<View className="bg-background-paper flex-1">
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="p-4 gap-4">
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
					<TextInput size="small" placeholder="Search unit..." icon="search-outline" iconPosition="right" />
				</View>
				<View className="flex-row items-center mx-auto gap-2">
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
				<View className="flex-row gap-0 gap-y-4 flex-wrap justify-between">
					{[
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
						30,
					].map((item) => (
						<TouchableOpacity
							activeOpacity={0.3}
							key={item}
							onPress={() => console.log('Pressed')}
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
									{item % 3 !== 0 ? (
										<Ionicons
											name="ellipse"
											color={item % 3 !== 0 ? COLORS.success.main : COLORS.error.main}
											size={24}
										/>
									) : (
										<BlinkView>
											<Ionicons
												name="ellipse"
												color={item % 3 !== 0 ? COLORS.success.main : COLORS.error.main}
												size={24}
											/>
										</BlinkView>
									)}
								</View>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default Content;
