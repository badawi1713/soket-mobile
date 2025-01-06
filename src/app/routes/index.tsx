import CaseDetailsScreen from '@/app/screens/case-details';
import LoginScreen from '@/app/screens/sign-in';
import UnitDetailsScreen from '@/app/screens/unit-details';
import SplashScreen from '@/components/SplashScreen';
import Typography from '@/components/Typography';
import { SETTINGS } from '@/constants/settings';
import { AuthProvider } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/utils/mmkv';
import { navigationRef, reset } from '@/utils/navigate';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { type StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster, toast } from 'sonner-native';
import MainApp from './main-app';

export type RootParamList = {
	'splash-screen': undefined;
	login: undefined;
	home: undefined;
	'main-app': undefined;
	'unit-details': {
		title: string;
		id: string;
	};
	'case-details': {
		title: 'open' | 'in-progress' | 'closed' | 'awaiting' | 'completed';
	};
};

export type AuthNavigationProp = StackNavigationProp<RootParamList>;

const Stack = createStackNavigator<RootParamList>();

const RootLayout = () => {
	const { setUser } = useAuth();

	axios.interceptors.response.use(
		(response) => response,
		(error) =>
			new Promise(() => {
				if (
					error.response?.status === 401 &&
					error.config &&
					!error.config.__isRetryRequest &&
					!error?.response?.data?.path?.includes('/identity/auth')
				) {
					handleInvalidSession({ showToast: false });
				}
				throw error;
			}),
	);

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
						reset('main-app');
					}, 500);
				}
			} catch (error) {
				handleInvalidSession({ showToast: true });
			}
		} else {
			if (navigationRef.isReady()) {
				setTimeout(() => {
					reset('login');
				}, 500);
			}
		}
	}, [setUser]);

	const handleInvalidSession = ({ showToast }: { showToast?: boolean }) => {
		setUser(null);
		storage.delete('userData');
		storage.delete(SETTINGS?.storageTokenKeyName);
		// biome-ignore lint/performance/noDelete: <explanation>
		delete axios.defaults.headers.common.Authorization;

		if (navigationRef.isReady()) {
			setTimeout(() => {
				reset('login'); // Navigate to Login
			}, 500);
		}
		if (showToast) {
			toast.error('Sorry, but your session is invalid');
		}
	};

	return (
		<SafeAreaProvider>
			<AutocompleteDropdownContextProvider>
				<GestureHandlerRootView>
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
								<Stack.Screen name="main-app" component={MainApp} options={{ headerShown: false }} />
								<Stack.Screen
									name="unit-details"
									component={UnitDetailsScreen}
									options={({ route, navigation }) => ({
										headerShadowVisible: false,
										headerTitle: () => <Typography weight="semibold">{route?.params?.title || ''}</Typography>,
										headerLeft: () => (
											<TouchableOpacity onPress={() => navigation.goBack()}>
												<Ionicons name="chevron-back" size={24} />
											</TouchableOpacity>
										),
									})}
								/>
								<Stack.Screen
									name="case-details"
									component={CaseDetailsScreen}
									options={({ navigation }) => ({
										headerShadowVisible: false,
										headerTitle: () => <Typography weight="semibold">Case Management</Typography>,
										headerLeft: () => (
											<TouchableOpacity onPress={() => navigation.goBack()}>
												<Ionicons name="chevron-back" size={24} />
											</TouchableOpacity>
										),
									})}
								/>
							</Stack.Navigator>
						</AuthProvider>
					</NavigationContainer>
					<Toaster theme="light" />
				</GestureHandlerRootView>
			</AutocompleteDropdownContextProvider>
		</SafeAreaProvider>
	);
};

export default RootLayout;
