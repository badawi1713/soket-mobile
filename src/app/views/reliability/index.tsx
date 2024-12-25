import Logo from '@/assets/images/logo-pln-np.svg';
import AppBar from '@/components/AppBar';
import ChartView from '@/components/ChartView';
import MenuItems from '@/components/MenuItems';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { scale } from 'react-native-size-matters';

const Screen = () => {
	return (
			<View className="bg-background-paper flex-1">
			<AppBar leftComponent={<Logo width={scale(120)} />} rightComponent={<MenuItems />} />
			<ScrollView contentContainerStyle={{ flexGrow: 1 }} contentContainerClassName="px-4">
				<ChartView />
			</ScrollView>
		</View>
	);
};

export default Screen;
