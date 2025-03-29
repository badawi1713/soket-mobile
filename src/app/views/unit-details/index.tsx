import type { AuthNavigationProp } from '@/app/routes';
import Card from '@/components/Card';
import GaugeChart from '@/components/GaugeChart';
import Skeleton from '@/components/Skeleton';
import SwitchButton from '@/components/SwitchButton';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleGetAnomalyStatisticData } from '@/store/slices/reliability-slices/anomaly-statistic-slice/actions';
import { handleGetAssetHealthIndicatorData } from '@/store/slices/reliability-slices/asset-health-indicator-slice/actions';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

const STATUS_LIST_DATA = [
  {
    title: 'Load',
    value: 100,
  },
  {
    title: 'Fuel',
    value: 334,
  },
  {
    title: 'NPHR',
    value: 200,
  },
  {
    title: 'BAT',
    value: 'ON',
  },
];

const STATUS_LIST_DATA_2 = [
  {
    title: 'Stock',
    value: 100,
  },
  {
    title: 'Effort',
    value: 334,
  },
  {
    title: 'EAF',
    value: 200,
  },
  {
    title: 'NCF',
    value: 210,
  },
  {
    title: 'SDOF',
    value: 210,
  },
];

type ContentProps = {
  plantName: string;
  id: string;
  objectId: string;
};

const Content = ({plantName, id, objectId}: ContentProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();

  const {loading: loadingAhi, data: assetHealthIndicatorData} = useAppSelector(
    state => state.assetHealthIndicatorReducer,
  );
  const {data: anomalyData, loading: loadingAnomalyData} = useAppSelector(
    state => state.anomalyStatisticReducer,
  );

  const handleSwitchChange = (value: string) => {};

  const {bottom} = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    if (id) {
      dispatch(handleGetAnomalyStatisticData({unitId: id}));
      dispatch(handleGetAssetHealthIndicatorData());
    }
  }, [id, dispatch]);

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

  const assetHealthIndicatorValue = useMemo(() => {
    const filterData = assetHealthIndicatorData?.chart
      ? assetHealthIndicatorData?.chart?.filter(
          item => item?.id === objectId?.substring(0, 2),
        )[0]
      : null;
    const result = filterData
      ? filterData?.children?.find(item => item?.id === objectId)?.value || 0
      : 0;
    return +result;
  }, [assetHealthIndicatorData, objectId]);

  return (
    <View className="flex-1 bg-background-main">
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
          paddingTop: 16,
          paddingBottom: bottom || 16,
        }}>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Status</Typography>
          <View className="w-full">
            <SwitchButton
              options={['Daily', 'Realtime']}
              onChange={handleSwitchChange}
              initialValue="Daily"
            />
          </View>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {STATUS_LIST_DATA?.map(item => (
              <Card
                key={item?.title}
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 2,
                  justifyContent: 'space-between',
                  gap: 12,
                  backgroundColor: item?.value
                    ? `${item?.value}`.includes('ON') ||
                      (`${item?.value}`.toLowerCase().includes('auto') &&
                        !`${item?.value}`.toLowerCase().includes('not ready'))
                      ? COLORS.success.main
                      : COLORS.error.main
                    : COLORS.error.main,
                  width: scale(70),
                }}>
                <Typography
                  className="text-center text-white"
                  variant="smallText"
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
            ))}
          </View>
        </View>

        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <View className="flex-row justify-start gap-x-1.5 gap-y-4 flex-wrap w-full">
            {STATUS_LIST_DATA_2?.map(item => (
              <Card
                key={item?.title}
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 2,
                  justifyContent: 'space-between',
                  gap: 12,
                  backgroundColor: item?.value
                    ? `${item?.value}`.includes('ON') ||
                      (`${item?.value}`.toLowerCase().includes('auto') &&
                        !`${item?.value}`.toLowerCase().includes('not ready'))
                      ? COLORS.success.main
                      : COLORS.error.main
                    : COLORS.error.main,
                  width: scale(92),
                }}>
                <Typography
                  className="text-center text-white"
                  variant="smallText"
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
            ))}
          </View>
        </View>

        <View className="flex-col gap-4 rounded-lg">
          <TouchableOpacity
            disabled={!id}
            onPress={() =>
              navigation.navigate('reliability-details', {
                unitId: `${id}`,
                title: 'Asset Health',
                subtitle: plantName || 'Unknown Unit',
              })
            }
            style={[styles.chartContainer]}>
            <GaugeChart
              title="Asset Health Indicator"
              loading={loadingAhi || refreshing}
              value={
                typeof assetHealthIndicatorValue === 'string'
                  ? +assetHealthIndicatorValue || 0
                  : assetHealthIndicatorValue || 0
              }
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Case Status</Typography>
          {refreshing || loadingAnomalyData || !id ? (
            <Skeleton height={scale(146)} width="100%" />
          ) : (
            <>
              <View className="flex-row justify-between gap-x-4">
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Case Management',
                      unitId: id,
                      subtitle: plantName,
                      type: 'awaiting',
                    })
                  }
                  title={`${anomalyData?.awaiting || 0}`}
                  variant="warning"
                  subtitle="AWAITING"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.border.light,
                    alignItems: 'center',
                  }}
                />
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Case Management',
                      unitId: id,
                      subtitle: plantName,
                      type: 'in-progress',
                    })
                  }
                  title={`${anomalyData?.inprogress || 0}`}
                  variant="info"
                  subtitle="IN PROGRESS"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.border.light,
                    alignItems: 'center',
                  }}
                />
              </View>
              <View className="flex-row justify-between gap-x-4">
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Case Management',
                      unitId: id,
                      subtitle: plantName,
                      type: 'completed',
                    })
                  }
                  title={`${anomalyData?.completed || 0}`}
                  variant="success"
                  subtitle="COMPLETED"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.border.light,
                    alignItems: 'center',
                  }}
                />
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Case Management',
                      unitId: id,
                      subtitle: plantName,
                      type: 'closed',
                    })
                  }
                  title={`${anomalyData?.closed || 0}`}
                  variant="default"
                  subtitle="CLOSED"
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: COLORS.border.light,
                    alignItems: 'center',
                  }}
                />
              </View>
            </>
          )}
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
