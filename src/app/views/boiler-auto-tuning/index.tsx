import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleGetBoilerEfficiencyChartData } from '@/store/slices/boiler-auto-tuning-slices/boiler-efficiency-chart-slice/actions';
import { handleGetBoilerEfficiencyStatisticData } from '@/store/slices/boiler-auto-tuning-slices/boiler-efficiency-statistic-slice/actions';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import { COLORS } from '../../../constants/colors';
import EfficiencyChart from './components/EfficiencyChart';

const Content = () => {
  const dispatch = useAppDispatch();
  const {data: boilerEfficiencyData, loading: loadingBoilerEfficiency} =
    useAppSelector(state => state.boilerEfficiencyReducer);
  const {
    data: boilerEfficiencyChartData,
    loading: loadingBoilerEfficiencyChart,
  } = useAppSelector(state => state.boilerEfficiencyChartReducer);

  const [selectedUnit, setSelectedUnit] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    dispatch(handleGetBoilerEfficiencyStatisticData({unitId: selectedUnit}));
    dispatch(handleGetBoilerEfficiencyChartData({unitId: selectedUnit}));
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

  const EFF_STATUS = useMemo(
    () => [
      {
        title: 'Baseline',
        value: boilerEfficiencyData?.efficiency?.baseLine || 0,
      },
      {
        title: 'Current',
        value: boilerEfficiencyData?.efficiency?.current || 0,
      },
      {
        title: 'Improvement',
        value: boilerEfficiencyData?.efficiency?.improvement || 0,
      },
    ],
    [boilerEfficiencyData],
  );

  const SOOTBLOW_STATUS = useMemo(
    () => [
      {
        title: 'Operation',
        value: boilerEfficiencyData?.sopt?.operation ? 'Enable' : 'Disable',
      },
      {
        title: 'Watchdog',
        value: boilerEfficiencyData?.sopt?.watchdog
          ? 'Connected'
          : 'Disconnected',
      },
      {
        title: 'Safeguard',
        value: boilerEfficiencyData?.sopt?.safeguard ? 'Ready' : 'Not Ready',
      },
    ],
    [boilerEfficiencyData],
  );

  const COMBUSTION_STATUS = useMemo(
    () => [
      {
        title: 'Operation',
        value: boilerEfficiencyData?.copt?.operation ? 'Enable' : 'Disable',
      },
      {
        title: 'Watchdog',
        value: boilerEfficiencyData?.copt?.watchdog
          ? 'Connected'
          : 'Disconnected',
      },
      {
        title: 'Safeguard',
        value: boilerEfficiencyData?.copt?.safeguard ? 'Ready' : 'Not Ready',
      },
    ],
    [boilerEfficiencyData],
  );

  return (
    <View className="flex-1 bg-background-main">
      <View className="px-4 pb-4 bg-background-paper">
        <View className="h-12">
          <Autocomplete
            setSelectedItem={setSelectedUnit}
            selectedItem={selectedUnit}
            module="bat"
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
        <LastUpdatedInfo
          value={
            boilerEfficiencyData?.efficiency?.updatedAt
              ? format(
                  new Date(boilerEfficiencyData?.efficiency?.updatedAt),
                  'MMM dd, yyyy  HH:mm',
                )
              : format(new Date(), 'MMM dd, yyyy  HH:mm')
          }
        />
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Efficiency Status</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {loadingBoilerEfficiency || !selectedUnit ? (
              <>
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
              </>
            ) : (
              EFF_STATUS?.map(item => (
                <Card
                  key={item?.title}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 4,
                    paddingHorizontal: 12,
                    justifyContent: 'space-between',
                    gap: 12,
                    backgroundColor: item?.title
                      ? `${item?.title}`.includes('Improvement')
                        ? COLORS.success.main
                        : 'transparent'
                      : 'transparent',
                  }}>
                  <Typography
                    className={
                      `${item?.title}`.includes('Improvement')
                        ? 'text-white'
                        : ''
                    }
                    variant="body2"
                    weight="medium">
                    {item?.title}
                  </Typography>
                  <Typography
                    className={
                      `${item?.title}`.includes('Improvement')
                        ? 'text-white'
                        : ''
                    }
                    variant="body2"
                    weight="bold">
                    {item?.value || 0}%
                  </Typography>
                </Card>
              ))
            )}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Efficiency Chart</Typography>
          <View className="w-full bg-slate-200">
            <EfficiencyChart
              loading={loadingBoilerEfficiencyChart || !selectedUnit}
              data={boilerEfficiencyChartData || []}
            />
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Sootblow Optimization</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-2">
            {loadingBoilerEfficiency || !selectedUnit ? (
              <>
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
              </>
            ) : (
              SOOTBLOW_STATUS?.map(item => (
                <Card
                  key={item?.title}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 4,
                    paddingHorizontal: 2,
                    justifyContent: 'space-between',
                    gap: 12,
                    backgroundColor: item?.value
                      ? `${item?.value}`.toLowerCase() === 'enable' ||
                        `${item?.value}`.toLowerCase() === 'connected' ||
                        `${item?.value}`.toLowerCase() === 'ready'
                        ? COLORS.success.main
                        : COLORS.error.main
                      : COLORS.error.main,
                    flex: 1,
                  }}>
                  <Typography
                    className="text-center text-white"
                    variant="caption"
                    weight="medium">
                    {item?.title}
                  </Typography>
                  <Typography
                    className="text-center text-white"
                    variant="caption"
                    weight="bold">
                    {item?.value || 0}
                  </Typography>
                </Card>
              ))
            )}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Combustion Optimization</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-2">
            {loadingBoilerEfficiency || !selectedUnit ? (
              <>
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
                <Skeleton width="32%" height={scale(54)} />
              </>
            ) : (
              COMBUSTION_STATUS?.map(item => (
                <Card
                  key={item?.title}
                  style={{
                    alignItems: 'center',
                    paddingVertical: 4,
                    paddingHorizontal: 2,
                    justifyContent: 'space-between',
                    gap: 12,
                    backgroundColor: item?.value
                      ? `${item?.value}`.toLowerCase() === 'enable' ||
                        `${item?.value}`.toLowerCase() === 'connected' ||
                        `${item?.value}`.toLowerCase() === 'ready'
                        ? COLORS.success.main
                        : COLORS.error.main
                      : COLORS.error.main,
                    flex: 1,
                  }}>
                  <Typography
                    className="text-center text-white"
                    variant="caption"
                    weight="medium">
                    {item?.title}
                  </Typography>
                  <Typography
                    className="text-center text-white"
                    variant="caption"
                    weight="bold">
                    {item?.value || 0}
                  </Typography>
                </Card>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    height: 240,
    overflow: 'hidden',
    borderRadius: 8,
  },
});
