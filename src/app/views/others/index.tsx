import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import images from '@/constants/images';
import React from 'react';
import { Image, Linking, ScrollView, TouchableOpacity, View } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { toast } from 'sonner-native';

const openInAppBrowser = async (url: string) => {
	try {
		const isAvailable = await InAppBrowser.isAvailable();
		if (isAvailable) {
			await InAppBrowser.open(url, {
				dismissButtonStyle: 'close',
				preferredBarTintColor: COLORS.primary.main,
				preferredControlTintColor: 'white',
				readerMode: false,
				animated: true,
				modalPresentationStyle: 'fullScreen',
				modalTransitionStyle: 'coverVertical',
				modalEnabled: true,
				enableBarCollapsing: false,
			});
		} else {
			toast.error('InAppBrowser is not available in this device. Open with default browser.');
			Linking.openURL(url);
		}
	} catch (_) {
		toast.error('InAppBrowser is not available in this device. Open with default browser.');
		Linking.openURL(url);
	}
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
					onPress={() => openInAppBrowser('http://10.7.1.116')}
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
