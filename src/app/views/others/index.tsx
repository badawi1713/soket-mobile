import Typography from '@/components/Typography';
import images from '@/constants/images';
import React from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';

const Screen = () => {
	return (
		<View className="bg-background-paper flex-1">
			<Typography variant="body1" weight="semibold" className='px-4'>
				Featured Apps
			</Typography>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 16, paddingVertical: 16 }}
			>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default Screen;
