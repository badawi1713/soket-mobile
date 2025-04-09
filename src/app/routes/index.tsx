import CaseDetailsScreen from '@/app/screens/case-details';
import PerformanceEfficiencyDetails from '@/app/screens/performance-efficiency-details';
import AssetHealthDetailsScreen from '@/app/screens/reliability-details';
import AnomalyDetailsScreen from '@/app/screens/reliability/anomaly-details';
import LoginScreen from '@/app/screens/sign-in';
import UnitDetailsScreen from '@/app/screens/unit-details';
import SplashScreen from '@/components/SplashScreen';
import Typography from '@/components/Typography';
import { SETTINGS } from '@/constants/settings';
import { useAuth } from '@/hooks/useAuth';
import { storage } from '@/utils/mmkv';
import { navigationRef, reset } from '@/utils/navigate';
import Ionicons from '@react-native-vector-icons/ionicons';
import { NavigationContainer } from '@react-navigation/native';
import {
  type StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
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
    objectId: string;
  };
  'case-details': {
    title: string;
    subtitle: string;
    type: 'in progress' | 'closed' | 'awaiting' | 'completed';
    unitId: string;
  };
  'anomaly-details': {
    title: string;
    subtitle: string;
    type: 'new' | 'in progress' | 'closed' | 'awaiting' | 'completed';
    unitId: string;
  };
  'reliability-details': {
    title: string;
    subtitle?: string;
    unitId: string;
  };
  'performance-efficiency-details': {
    title?: string;
    subtitle?: string;
    unitId: string;
  };
};

export type AuthNavigationProp = StackNavigationProp<RootParamList>;

const Stack = createStackNavigator<RootParamList>();

const isIos = Platform.OS === 'ios';

const RootLayout = () => {
  const {setUser} = useAuth();

  axios.interceptors.response.use(
    response => response,
    error =>
      new Promise(() => {
        if (
          error.response?.status === 401 &&
          error.config &&
          !error.config.__isRetryRequest &&
          !error?.response?.data?.path?.includes('/identity/auth')
        ) {
          handleInvalidSession({showToast: false});
        }
        throw error;
      }),
  );

  const initAuth = useCallback(async () => {
    const storedToken = await storage.getString(SETTINGS?.storageTokenKeyName);

    if (storedToken) {
      try {
        const response = await axios.get(SETTINGS?.meEndpoint, {
          headers: {Authorization: `Bearer ${storedToken}`},
        });

        setUser(response.data?.object?.user);
        axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;

        if (navigationRef.isReady()) {
          setTimeout(() => {
            reset('main-app');
          }, 500);
        }
      } catch (error) {
        handleInvalidSession({showToast: true});
      }
    } else {
      if (navigationRef.isReady()) {
        setTimeout(() => {
          reset('login');
        }, 500);
      }
    }
  }, [setUser]);

  const handleInvalidSession = ({showToast}: {showToast?: boolean}) => {
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
      <GestureHandlerRootView>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            initAuth();
          }}>
          <Stack.Navigator initialRouteName="splash-screen">
            <Stack.Screen
              name="splash-screen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="main-app"
              component={MainApp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="unit-details"
              component={UnitDetailsScreen}
              options={({route, navigation}) => ({
                headerStyle: {
                  height: isIos ? verticalScale(96) : verticalScale(60),
                },
                headerShadowVisible: false,
                headerTitle: () => {
                  return (
                    <View className={isIos ? 'items-center' : 'items-start'}>
                      <Typography weight="semibold">
                        {route?.params?.title || ''}
                      </Typography>
                      {/* <Typography variant="caption">{route?.params?.title || ''}</Typography> */}
                    </View>
                  );
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: moderateScale(16),
                      marginRight: moderateScale(8),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="case-details"
              component={CaseDetailsScreen}
              options={({navigation, route}) => ({
                headerStyle: {
                  height: isIos ? verticalScale(96) : verticalScale(60),
                },
                headerShadowVisible: false,
                headerTitle: () => {
                  return (
                    <View className={isIos ? 'items-center' : 'items-start'}>
                      <Typography weight="semibold">
                        {route.params.title}
                      </Typography>
                      <Typography variant="caption">
                        {route.params.subtitle}
                      </Typography>
                    </View>
                  );
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: moderateScale(16),
                      marginRight: moderateScale(8),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="anomaly-details"
              component={AnomalyDetailsScreen}
              options={({navigation, route}) => ({
                headerStyle: {
                  height: isIos ? verticalScale(96) : verticalScale(60),
                },
                headerShadowVisible: false,
                headerTitle: () => {
                  return (
                    <View className={isIos ? 'items-center' : 'items-start'}>
                      <Typography weight="semibold">
                        {route.params.title}
                      </Typography>
                      <Typography variant="caption">
                        {route.params.subtitle}
                      </Typography>
                    </View>
                  );
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: moderateScale(16),
                      marginRight: moderateScale(8),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="reliability-details"
              component={AssetHealthDetailsScreen}
              options={({navigation, route}) => ({
                headerStyle: {
                  height: isIos ? verticalScale(96) : verticalScale(60),
                },
                headerShadowVisible: false,
                headerTitle: () => {
                  return (
                    <View className={isIos ? 'items-center' : 'items-start'}>
                      <Typography weight="semibold">
                        {route.params.title}
                      </Typography>
                      <Typography variant="caption">
                        {route.params.subtitle}
                      </Typography>
                    </View>
                  );
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: moderateScale(16),
                      marginRight: moderateScale(8),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="performance-efficiency-details"
              component={PerformanceEfficiencyDetails}
              options={({navigation, route}) => ({
                headerStyle: {
                  height: isIos ? verticalScale(96) : verticalScale(60),
                },
                headerShadowVisible: false,
                headerTitle: () => {
                  return (
                    <View className={isIos ? 'items-center' : 'items-start'}>
                      <Typography weight="semibold">
                        Performance & Efficiency
                      </Typography>
                      <Typography variant="caption">
                        {route.params.subtitle}
                      </Typography>
                    </View>
                  );
                },
                headerLeft: () => (
                  <TouchableOpacity
                    style={{
                      marginLeft: moderateScale(16),
                      marginRight: moderateScale(8),
                    }}
                    onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} />
                  </TouchableOpacity>
                ),
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toaster theme="light" />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default RootLayout;
