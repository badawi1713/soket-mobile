import BoilerAutoTuning from '@/app/screens/boiler-auto-tuning';
import Dashboard from '@/app/screens/dashboard';
import Efficiency from '@/app/screens/efficiency';
import Others from '@/app/screens/others';
import Reliability from '@/app/screens/reliability';
import BottomTabBar from '@/components/BottomTabBar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for the Tab Navigator
type MainAppParamList = {
	dashboard: undefined;
	reliability: undefined;
	efficiency: undefined;
	'boiler-auto-tuning': undefined;
	others: undefined;
};

// Create the Tab Navigator
const Tab = createBottomTabNavigator<MainAppParamList>();

// Example Screens

const MainApp: React.FC = () => {
	return (
		<SafeAreaView className="flex-1 bg-background-paper">
			<Tab.Navigator tabBar={(props) => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
				<Tab.Screen name="dashboard" component={Dashboard} />
				<Tab.Screen name="reliability" component={Reliability} />
				<Tab.Screen name="efficiency" component={Efficiency} />
				<Tab.Screen name="boiler-auto-tuning" component={BoilerAutoTuning} />
				<Tab.Screen name="others" component={Others} />
			</Tab.Navigator>
		</SafeAreaView>
	);
};

export default MainApp;
