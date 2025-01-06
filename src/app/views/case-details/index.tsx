import Chip from '@/components/Chip';
import IconButton from '@/components/IconButton';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, View } from 'react-native';

type ScreenProps = {
	title: 'open' | 'closed' | 'awaiting' | 'in-progress' | 'completed';
};

const Content = ({ title = 'open' }: ScreenProps) => {
	const variantStatus: {
		open: 'error';
		closed: 'secondary';
		awaiting: 'warning';
		'in-progress': 'info';
		completed: 'success';
	} = {
		open: 'error',
		closed: 'secondary',
		awaiting: 'warning',
		'in-progress': 'info',
		completed: 'success',
	};

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View className="px-4 pt-4 flex-1 pb-8 gap-y-4">
				<View className="bg-background-paper rounded-md px-5 py-2">
					<View className="flex-row items-center w-full gap-x-2">
						<Chip
							color="primary"
							variant="contained"
							size="small"
							shape="rectangular"
							style={{ width: 'auto' }}
							text="255"
						/>
						<Chip
							color="primary"
							variant="contained"
							size="small"
							shape="rectangular"
							style={{ width: 'auto' }}
							text="31"
						/>
						<Chip
							color="primary"
							variant="contained"
							size="small"
							shape="rectangular"
							style={{ width: 'auto' }}
							text="Anomaly SOK"
						/>
						<Chip
							color={variantStatus[title] || ''}
							variant="contained"
							size="small"
							shape="rectangular"
							style={{ width: 'auto', marginLeft: 'auto' }}
							text={title.replace('\-', ' ').toUpperCase()}
						/>
					</View>
					<View className="mt-4 mb-3">
						<Typography>Condeser Press</Typography>
					</View>
					<View className="flex-row gap-x-2 items-end justify-between">
						<View className="flex-1">
							<Typography variant="caption">John Doe</Typography>
							<Typography variant="caption">
								PLTU Tenayan #1, Condenser, {format(new Date(), 'MMM dd yyyy HH:mm')}
							</Typography>
						</View>

						<IconButton
							buttonStyle="normal"
							onPress={() => console.log('hello')}
							iconColor={COLORS.common.black}
							icon="share-social"
							size="small"
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

export default Content;
