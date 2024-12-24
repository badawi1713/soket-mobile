import HomeScreen from '@/app/screens/home';
import LoginScreen from '@/app/screens/sign-in';
import SplashScreen from '@/components/SplashScreen';
import { SETTINGS } from '@/constants/settings';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/utils/mmkv';
import { navigationRef, reset } from '@/utils/navigate';
import { NavigationContainer } from '@react-navigation/native';
import { type StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';

export type RootParamList = {
	login: undefined;
	home: undefined;
};

export type AuthNavigationProp = StackNavigationProp<RootParamList>;

const Stack = createStackNavigator();

const RootLayout = () => {
	const { setUser } = useAuth();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const initAuth = useCallback(async () => {
		const storedToken = await storage.getString(SETTINGS?.storageTokenKeyName);
		if (storedToken) {
			try {
				const response = await axios.get(SETTINGS?.meEndpoint, {
					headers: { Authorization: `Bearer ${storedToken}` },
				});
				setUser(response.data?.object);
				axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
				if (navigationRef.isReady()) {
					setTimeout(() => {
						reset('home');
					}, 1000);
				}
			} catch (error) {
				console.log('Token validation failed:', error);
				setUser(null);
				// biome-ignore lint/performance/noDelete: <explanation>
				delete axios.defaults.headers.common.Authorization;
				if (navigationRef.isReady()) {
					setTimeout(() => {
						reset('login');
					}, 1000);
				}
			}
		} else {
			console.log('No token found');
			setUser(null);
			if (navigationRef.isReady()) {
				setTimeout(() => {
					reset('login');
				}, 1000);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Trigger authentication logic only when NavigationContainer is ready
	useEffect(() => {
		initAuth();
	}, [initAuth]);

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				initAuth();
			}}
		>
			<AuthProvider>
				<Stack.Navigator initialRouteName="splash-screen">
					<Stack.Screen name="splash-screen" component={SplashScreen} options={{ headerShown: false }} />
					<Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
					<Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
				</Stack.Navigator>
			</AuthProvider>
		</NavigationContainer>
	);
};

export default RootLayout;
