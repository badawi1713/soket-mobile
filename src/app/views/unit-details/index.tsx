import type {AuthNavigationProp} from '@/app/routes';
import Card from '@/components/Card';
import GaugeChart from '@/components/GaugeChart';
import Skeleton from '@/components/Skeleton';
import SwitchButton from '@/components/SwitchButton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {handleGetAnomalyDetailData} from '@/store/slices/reliability-slices/anomaly-detail-slice/actions';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';

type ContentProps = {
  plantName: string;
  id: string;
  objectId: string;
};

const Content = ({plantName, id}: ContentProps) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();

  const {data: anomalyDetailData, loading: loadingAnomalyDetailData} =
    useAppSelector(state => state.anomalyDetailReducer);

  const {bottom} = useSafeAreaInsets();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [tabValue, setTabValue] = useState<string>('Daily');

  const handleSwitchChange = (value: string) => {
    setTabValue(value);
  };

  const fetchInitialData = useCallback(async () => {
    if (id) {
      dispatch(
        handleGetAnomalyDetailData({
          unitId: id,
          type: tabValue?.toLowerCase() === 'realtime' ? '2' : '1',
        }),
      );
    }
  }, [id, dispatch, tabValue]);

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

  const assetHealthIndicatorValue = 0;

  const STATUS_LIST_DATA = useMemo(
    () => [
      {
        title: 'Load',
        value: anomalyDetailData?.status?.load || 0,
      },
      {
        title: 'Fuel',
        value: anomalyDetailData?.status?.fuel || 0,
      },
      {
        title: 'NPHR',
        value: anomalyDetailData?.status?.nphr || 0,
      },
      {
        title: 'BAT',
        value: anomalyDetailData?.status?.bat || 'OFF',
      },
    ],
    [anomalyDetailData],
  );

  const STATUS_LIST_DATA_2 = useMemo(
    () => [
      {
        title: 'Stock',
        value: anomalyDetailData?.status?.stock || 'N/A',
      },
      {
        title: 'Effort',
        value: anomalyDetailData?.status?.effor || 0,
      },
      {
        title: 'EAF',
        value: anomalyDetailData?.status?.eaf || 0,
      },
      {
        title: 'NCF',
        value: anomalyDetailData?.status?.ncf || 0,
      },
      {
        title: 'SDOF',
        value: anomalyDetailData?.status?.sdof || 0,
      },
    ],
    [anomalyDetailData],
  );

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
          <Typography weight="semibold">Detail</Typography>
          <View className="w-full">
            <SwitchButton
              options={['Daily', 'Realtime']}
              onChange={handleSwitchChange}
              initialValue="Daily"
            />
          </View>
          {refreshing || loadingAnomalyDetailData || !id ? (
            <Skeleton height={scale(48)} width="100%" />
          ) : (
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
          )}
        </View>

        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          {refreshing || loadingAnomalyDetailData || !id ? (
            <Skeleton height={scale(108)} width="100%" />
          ) : (
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
          )}
        </View>

        <View className="flex-col gap-4 rounded-lg">
          <TouchableOpacity
            disabled
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
              loading={loadingAnomalyDetailData || refreshing}
              value={
                typeof assetHealthIndicatorValue === 'string'
                  ? +assetHealthIndicatorValue || 0
                  : assetHealthIndicatorValue || 0
              }
            />
          </TouchableOpacity>
        </View>

        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Case Detail</Typography>
          {refreshing || loadingAnomalyDetailData || !id ? (
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
                  title={`${anomalyDetailData?.caseStatus?.awaiting || 0}`}
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
                      type: 'in progress',
                    })
                  }
                  title={`${anomalyDetailData?.caseStatus?.inProgress || 0}`}
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
                  title={`${anomalyDetailData?.caseStatus?.completed || 0}`}
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
                  title={`${anomalyDetailData?.caseStatus?.closed || 0}`}
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
