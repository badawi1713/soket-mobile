import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '@/context/AuthContext';
import LoginScreen from '@/app/screens/sign-in';
import HomeScreen from '@/app/screens/home';

const Stack = createStackNavigator();

const AppNavigation = () => (
	<Stack.Navigator initialRouteName="Sign-In">
		<Stack.Screen name="Sign-In" component={LoginScreen} options={{ headerShown: false }} />
		<Stack.Screen name="Home" component={HomeScreen} />
	</Stack.Navigator>
);

const RootLayout = () => {
	return (
		<NavigationContainer>
			<AuthProvider>
				<AppNavigation />
			</AuthProvider>
		</NavigationContainer>
	);
};

export default RootLayout;
