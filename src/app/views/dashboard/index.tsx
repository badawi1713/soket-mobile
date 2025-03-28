import type { AuthNavigationProp } from '@/app/routes';
import BlinkView from '@/components/BlinkView';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Skeleton from '@/components/Skeleton';
import TextInput from '@/components/TextInput';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import images from '@/constants/images';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleGetUnitListData } from '@/store/slices/common-slices/unit-list-slice/actions';
import { handleGetDashboardStatisticData } from '@/store/slices/dashboard-slices/dashboard-statistic-slice/actions';
import Ionicons from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const Content = () => {
  const dispatch = useAppDispatch();
  const {loading: loadingStatisticData, data: statisticData = null} =
    useAppSelector(state => state.dashboardStatisticReducer);
  const {loading: loadingUnitList, data: unitData = []} = useAppSelector(
    state => state.unitListReducer,
  );

  const navigation = useNavigation<AuthNavigationProp>();
  const [keyword, setKeyword] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const filteredData = useMemo(() => {
    return unitData.filter(item =>
      item?.title.toLowerCase().includes(keyword.toLowerCase()),
    );
  }, [keyword, unitData]);

  const fetchInitialData = useCallback(() => {
    dispatch(handleGetDashboardStatisticData());
    dispatch(handleGetUnitListData({module: ''}));
  }, [dispatch]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      fetchInitialData();
      setRefreshing(false);
    }, 1500);
  }, [fetchInitialData]);

  return (
    <View className="flex-1 bg-background-paper">
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary.main]}
            tintColor={COLORS.secondary.main}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{flexGrow: 1}}
        contentContainerClassName="px-4 pb-4 gap-4">
        <View className="flex-row justify-between gap-x-4">
          <Card
            title={statisticData?.capacity || '0 GW'}
            variant="primary"
            subtitle="Total Capacity"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: COLORS.border.light,
              alignItems: 'center',
            }}
            icon="flash"
          />
          <Card
            title={statisticData?.gross || '0 GW'}
            variant="error"
            subtitle="Total Gross Load"
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: COLORS.border.light,
              alignItems: 'center',
            }}
            icon="trending-up"
          />
        </View>
        <View>
          <TextInput
            size="small"
            placeholder="Search unit..."
            icon={keyword ? 'close' : 'search-outline'}
            onIconPress={() => (keyword ? setKeyword('') : true)}
            value={keyword}
            onChangeText={e => setKeyword(e)}
            iconPosition="right"
          />
        </View>
        <LastUpdatedInfo
          loading={loadingStatisticData}
          value={`${
            statisticData?.lastUpdate ||
            format(new Date(), 'MMM dd, yyyy  HH:mm')
          }`}
        />
        {loadingUnitList ? (
          <View className="flex-row flex-wrap justify-between gap-0 gap-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <View className="h-32 w-[48%]" key={item}>
                <Skeleton width="100%" height="100%" />
              </View>
            ))}
          </View>
        ) : filteredData?.length < 1 ? (
          <View className="items-center justify-center mt-4">
            <Typography className="text-center" variant="body2">
              No data found. Please try searching with a different keyword.
            </Typography>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between gap-0 gap-y-4">
            {filteredData.map(item => (
              <TouchableOpacity
                activeOpacity={0.3}
                key={item?.id}
                onPress={() =>
                  navigation.navigate('unit-details', {
                    id: `${item?.id}`,
                    title: item?.title,
                  })
                }
                style={{width: '48%'}}>
                <View className="relative h-32 rounded-md bg-slate-200">
                  <Image
                    source={images.imgPlantExample}
                    style={{width: '100%', height: '100%'}}
                    className="rounded-md"
                    resizeMode="stretch"
                  />
                  <View className="absolute top-2 left-2">
                    {item?.status ? (
                      <Ionicons
                        name="ellipse"
                        color={
                          item?.status ? COLORS.success.main : COLORS.error.main
                        }
                        size={24}
                      />
                    ) : (
                      <BlinkView>
                        <Ionicons
                          name="ellipse"
                          color={
                            item?.status
                              ? COLORS.success.main
                              : COLORS.error.main
                          }
                          size={24}
                        />
                      </BlinkView>
                    )}
                  </View>
                  <View className="absolute bottom-0 w-full rounded-b-md">
                    <View className="absolute z-10 w-full h-full bg-black opacity-55 rounded-b-md" />
                    <View className="z-20 px-2 py-1">
                      <Typography
                        className="text-center text-white font-oxanium-medium"
                        variant="smallText">
                        {item?.title || 'Unknown imgPlantExample'}
                      </Typography>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Content;
