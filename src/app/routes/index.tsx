import CaseDetailsScreen from '@/app/screens/case-details';
import AssetHealthDetailsScreen from '@/app/screens/reliability-details';
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
import { Platform, TouchableOpacity, View } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Toaster, toast } from 'sonner-native';
import MainApp, { type MainAppParamList } from './main-app';

export type RootParamList = {
	'splash-screen': undefined;
	login: undefined;
	home: undefined;
	'main-app': {
		screen?: keyof MainAppParamList;
	};
	'unit-details': {
		title: string;
		id: string;
	};
	'case-details': {
		title: string;
		subtitle: string;
		type: 'open' | 'in-progress' | 'closed' | 'awaiting' | 'completed';
	};
	'reliability-details': {
		title: string;
		subtitle?: string;
		id: string;
	};
};

export type AuthNavigationProp = StackNavigationProp<RootParamList>;

const Stack = createStackNavigator<RootParamList>();

const isIos = Platform.OS === 'ios';

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
										headerStyle: { height: isIos ? verticalScale(96) : verticalScale(60) },
										headerShadowVisible: false,
										headerTitle: () => {
											return (
												<View className={isIos ? 'items-center' : 'items-start'}>
													<Typography weight="semibold">{route?.params?.title || ''}</Typography>
													{/* <Typography variant="caption">{route?.params?.title || ''}</Typography> */}
												</View>
											);
										},
										headerLeft: () => (
											<TouchableOpacity
												style={{ marginLeft: moderateScale(16), marginRight: moderateScale(8) }}
												onPress={() => navigation.goBack()}
											>
												<Ionicons name="chevron-back" size={24} />
											</TouchableOpacity>
										),
									})}
								/>
								<Stack.Screen
									name="case-details"
									component={CaseDetailsScreen}
									options={({ navigation, route }) => ({
										headerStyle: { height: isIos ? verticalScale(96) : verticalScale(60) },
										headerShadowVisible: false,
										headerTitle: () => {
											return (
												<View className={isIos ? 'items-center' : 'items-start'}>
													<Typography weight="semibold">{route.params.title}</Typography>
													<Typography variant="caption">{route.params.subtitle}</Typography>
												</View>
											);
										},
										headerLeft: () => (
											<TouchableOpacity
												style={{ marginLeft: moderateScale(16), marginRight: moderateScale(8) }}
												onPress={() => navigation.goBack()}
											>
												<Ionicons name="chevron-back" size={24} />
											</TouchableOpacity>
										),
									})}
								/>
								<Stack.Screen
									name="reliability-details"
									component={AssetHealthDetailsScreen}
									options={({ navigation, route }) => ({
										headerStyle: { height: isIos ? verticalScale(96) : verticalScale(60) },
										headerShadowVisible: false,
										headerTitle: () => {
											return (
												<View className={isIos ? 'items-center' : 'items-start'}>
													<Typography weight="semibold">{route.params.title}</Typography>
													<Typography variant="caption">{route.params.subtitle}</Typography>
												</View>
											);
										},
										headerLeft: () => (
											<TouchableOpacity
												style={{ marginLeft: moderateScale(16), marginRight: moderateScale(8) }}
												onPress={() => navigation.goBack()}
											>
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
