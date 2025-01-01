import Logo from '@/assets/images/logo-pln-np.svg';
import AppBar from '@/components/AppBar';
import Typography from '@/components/Typography';
import images from '@/constants/images';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';

const Screen = () => {
	return (
		<View className="bg-background-main flex-1">
			<AppBar
				leftComponent={<Logo width={scale(120)} />}
				rightComponent={
					<Typography weight="bold" variant="body2">
						Feature Apps
					</Typography>
				}
			/>
			<ScrollView
				className="bg-background-paper"
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
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
					<Image className="w-12 h-12" resizeMode="contain" source={images.imgApp1} />
					<Typography variant="body1" weight="semibold">
						PKU
					</Typography>
				</TouchableOpacity>				<TouchableOpacity className="flex-row items-center gap-4 py-3 border-b border-b-border-light">
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

const styles = StyleSheet.create({
	chartContainer: {
		flex: 1,
		height: 240,
		overflow: 'hidden',
		borderRadius: 8,
	},
});
