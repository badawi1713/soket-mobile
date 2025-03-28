import type {AuthNavigationProp} from '@/app/routes';
import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {handleGetEfficiencyKpiData} from '@/store/slices/efficiency-slices/efficiency-kpi-slice/actions';
import {default as Icon} from '@react-native-vector-icons/ionicons';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';

const Content = () => {
  const dispatch = useAppDispatch();
  const {data, loading} = useAppSelector(state => state.efficiencyKpiReducer);

  const navigation = useNavigation<AuthNavigationProp>();
  const [selectedUnit, setSelectedUnit] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInitialData = useCallback(() => {
    dispatch(handleGetEfficiencyKpiData({unitId: selectedUnit}));
  }, [selectedUnit, dispatch]);

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
    <View className="flex-1 bg-background-main">
      <View className="px-4 pb-4 bg-background-paper">
        <View className="h-12">
          <Autocomplete
            setSelectedItem={setSelectedUnit}
            selectedItem={selectedUnit}
          />
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[COLORS.primary.main]}
            tintColor={COLORS.secondary.main}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        <LastUpdatedInfo value={format(new Date(), 'MMM dd, yyyy  HH:mm')} />
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Measured KPI</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <Skeleton key={item} width={scale(68)} height={scale(74)} />
              ))
            ) : data?.length < 1 ? (
              <Card
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  justifyContent: 'space-between',
                  gap: 12,
                  width: '100%',
                }}>
                <Typography
                  numberOfLines={1}
                  lineBreakMode="middle"
                  lineBreakStrategyIOS="push-out"
                  className="text-center"
                  variant="smallText">
                  {''}
                </Typography>
                <Typography
                  color={COLORS.secondary.main}
                  className="text-center"
                  variant="label"
                  weight="medium">
                  No data available
                </Typography>
                <Typography
                  className="text-center"
                  color={COLORS.secondary.main}
                  variant="smallText">
                  {''}
                </Typography>
              </Card>
            ) : (
              data?.map((item, index) => (
                <Card
                  key={`${index + item?.kpi}`}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    justifyContent: 'space-between',
                    gap: 12,
                    backgroundColor:
                      index === 0 ? COLORS.secondary.light : 'transparent',
                    width: scale(68),
                  }}>
                  <Typography
                    numberOfLines={1}
                    lineBreakMode="middle"
                    lineBreakStrategyIOS="push-out"
                    className="text-center"
                    variant="smallText">
                    {item?.kpi}
                  </Typography>
                  <Typography
                    className="text-center"
                    variant="header6"
                    weight="medium">
                    {Number(item?.measured || 0).toFixed(1)}
                  </Typography>
                  <Typography
                    className="text-center"
                    color={COLORS.secondary.main}
                    variant="smallText">
                    {item?.unit || ''}
                  </Typography>
                </Card>
              ))
            )}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Heat Balance KPI</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                <Skeleton key={item} width={scale(68)} height={scale(74)} />
              ))
            ) : data?.length < 1 ? (
              <Card
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  justifyContent: 'space-between',
                  gap: 12,
                  width: '100%',
                }}>
                <Typography
                  numberOfLines={1}
                  lineBreakMode="middle"
                  lineBreakStrategyIOS="push-out"
                  className="text-center"
                  variant="smallText">
                  {''}
                </Typography>
                <Typography
                  color={COLORS.secondary.main}
                  className="text-center"
                  variant="label"
                  weight="medium">
                  No data available
                </Typography>
                <Typography
                  className="text-center"
                  color={COLORS.secondary.main}
                  variant="smallText">
                  {''}
                </Typography>
              </Card>
            ) : (
              data?.map((item, index) => (
                <Card
                  key={`${index + item?.kpi}`}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    justifyContent: 'space-between',
                    gap: 12,
                    backgroundColor:
                      index === 0 ? COLORS.secondary.light : 'transparent',
                    width: scale(68),
                  }}>
                  <Typography
                    numberOfLines={1}
                    lineBreakMode="middle"
                    lineBreakStrategyIOS="push-out"
                    className="text-center"
                    variant="smallText">
                    {item?.kpi}
                  </Typography>
                  <Typography
                    className="text-center"
                    variant="header6"
                    weight="medium">
                    {Number(item?.heatBalance || 0).toFixed(1)}
                  </Typography>
                  <Typography
                    className="text-center"
                    color={COLORS.secondary.main}
                    variant="smallText">
                    {item?.unit || ''}
                  </Typography>
                </Card>
              ))
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('performance-efficiency-details', {
              subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
              id: '1',
            })
          }
          className="flex-row items-center justify-between p-4 bg-white rounded-lg">
          <Typography variant="body2" weight="medium">
            Performance and Efficiency
          </Typography>
          <Icon size={18} name="arrow-up-right-box-outline" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Content;
