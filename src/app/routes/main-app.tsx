import BoilerAutoTuning from '@/app/screens/boiler-auto-tuning';
import Dashboard from '@/app/screens/dashboard';
import Efficiency from '@/app/screens/efficiency';
import Others from '@/app/screens/others';
import Reliability from '@/app/screens/reliability';
import Logo from '@/assets/images/logo-pln-np.svg';
import AppBar from '@/components/AppBar';
import BottomTabBar from '@/components/BottomTabBar';
import MenuItems from '@/components/MenuItems';
import Typography from '@/components/Typography';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

type MainAppParamList = {
	dashboard: undefined;
	reliability: undefined;
	efficiency: undefined;
	'boiler-auto-tuning': undefined;
	others: undefined;
};

const Tab = createBottomTabNavigator<MainAppParamList>();

const MainApp: React.FC = () => {
	return (
		<SafeAreaView style={{ height: '100%', flex: 1, paddingBottom: 0 }} className="bg-background-paper">
			<Tab.Navigator
				tabBar={(props) => <BottomTabBar {...props} />}
				screenOptions={{
					headerShown: true,
				}}
			>
				<Tab.Screen
					name="dashboard"
					component={Dashboard}
					options={{
						header: () => <AppBar leftComponent={<Logo width={scale(120)} />} rightComponent={<MenuItems />} />,
					}}
				/>
				<Tab.Screen
					name="reliability"
					component={Reliability}
					options={{
						header: () => (
							<AppBar
								leftComponent={<Logo width={scale(120)} />}
								rightComponent={
									<Typography weight="bold" variant="body2">
										Reliability Optimization
									</Typography>
								}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="efficiency"
					component={Efficiency}
					options={{
						header: () => (
							<AppBar
								leftComponent={<Logo width={scale(120)} />}
								rightComponent={
									<Typography weight="bold" variant="body2">
										Efficiency Optimization
									</Typography>
								}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="boiler-auto-tuning"
					component={BoilerAutoTuning}
					options={{
						header: () => (
							<AppBar
								leftComponent={<Logo width={scale(120)} />}
								rightComponent={
									<Typography weight="bold" variant="body2">
										Boiler Auto Tuning
									</Typography>
								}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="others"
					component={Others}
					options={{
						header: () => <AppBar leftComponent={<Logo width={scale(120)} />} rightComponent={<MenuItems />} />,
					}}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};

export default MainApp;
