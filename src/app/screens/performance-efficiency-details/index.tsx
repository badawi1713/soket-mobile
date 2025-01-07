import renderScene from '@/app/views/performance-efficiency-details';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TabBar, TabView } from 'react-native-tab-view';

const routes = [
	{ key: 'performance', title: 'Performance Summary' },
	{ key: 'efficiency', title: 'Efficiency' },
	{ key: 'energy-loss', title: 'Energy-Loss Analysis' },
	{ key: 'aux-power', title: 'Auxiliary Power' },
];

const Screen = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = useState(0);

	return (
		<TabView
			lazy
			commonOptions={{
				labelStyle: {
					fontFamily: FONTS['oxanium-medium'],
					fontSize: moderateScale(10.5),
				},
			}}
			swipeEnabled
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={{ width: layout.width }}
			renderTabBar={(props) => (
				<TabBar
					{...props}
					scrollEnabled
					indicatorStyle={{ backgroundColor: COLORS.primary.main, height: 3 }}
					style={{ backgroundColor: COLORS.common.white }}
					activeColor={COLORS.primary.main}
					inactiveColor={COLORS.secondary.main}
				/>
			)}
			style={{
				backgroundColor: COLORS.background.main,
			}}
		/>
	);
};

export default Screen;
