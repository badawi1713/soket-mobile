import Typography from '@/components/Typography';
import images from '@/constants/images';
import React from 'react';
import { Image, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import { toast } from 'sonner-native';

const openExternalLink = async (url: string) => {
	await Linking.canOpenURL(url)
		.then((supported) => {
			if (supported) {
				Linking.openURL(url);
			} else {
				toast.error(`Don't know how to open URI: ${url}`);
			}
		})
		.catch((err) => toast.error(`An error occurred ${err}`));
};

const Content = () => {
	return (
		<View className="bg-background-paper flex-1">
			<Typography variant="body1" weight="semibold" className="px-4">
				Featured Apps
			</Typography>
			<ScrollView contentContainerStyle={{ flexGrow: 1, gap: 16, paddingHorizontal: 16, paddingVertical: 16 }}>
				<TouchableOpacity
					className="flex-row items-center gap-4 py-3 border-b border-b-border-light"
					onPress={() => openExternalLink('http://10.7.1.116')}
				>
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgLogoApp} />
					<Typography variant="body1" weight="semibold">
						SOKET Tools
					</Typography>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default Content;
