import type { AuthNavigationProp } from '@/app/routes';
import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import GaugeChart from '@/components/GaugeChart';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { handleGetAssetHealthIndicatorData } from '@/store/slices/reliability-slices/asset-health-indicator-slice/actions';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { handleGetAnomalyStatisticData } from '../../../store/slices/reliability-slices/anomaly-statistic-slice/actions';

const Content = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProp>();

  const {data: unitList} = useAppSelector(state => state.unitListReducer);
  const {loading: loadingAhi, data: assetHealthIndicatorData} = useAppSelector(
    state => state.assetHealthIndicatorReducer,
  );
  const {data: anomalyData, loading: loadingAnomalyData} = useAppSelector(
    state => state.anomalyStatisticReducer,
  );

  const [selectedUnit, setSelectedUnit] = useState('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    dispatch(handleGetAnomalyStatisticData({unitId: selectedUnit}));
    dispatch(handleGetAssetHealthIndicatorData());
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

  const selectedUnitData = useMemo(() => {
    const unit =
      unitList?.length > 0
        ? unitList?.find(item => item?.id === selectedUnit)
        : null;
    return unit;
  }, [selectedUnit, unitList]);

  const assetHealthIndicatorValue = useMemo(() => {
    const filterData = assetHealthIndicatorData?.chart
      ? assetHealthIndicatorData?.chart?.filter(
          item => item?.id === selectedUnitData?.objectId?.substring(0, 2),
        )[0]
      : null;
    const result = filterData
      ? filterData?.children?.find(
          item => item?.id === selectedUnitData?.objectId,
        )?.value || 0
      : 0;
    return +result;
  }, [assetHealthIndicatorData, selectedUnitData]);

  return (
    <View className="flex-1 bg-background-main">
      <View className="px-4 pb-4 bg-background-paper">
        <View className="h-12">
          <Autocomplete
            setSelectedItem={setSelectedUnit}
            selectedItem={selectedUnit}
            module=""
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
            assetHealthIndicatorData?.lastupdate
              ? format(
                  new Date(assetHealthIndicatorData?.lastupdate),
                  'MMM dd, yyyy  HH:mm',
                )
              : format(new Date(), 'MMM dd, yyyy  HH:mm')
          }
        />
        <View className="flex-col gap-4 rounded-lg">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('reliability-details', {
                unitId: `${selectedUnitData?.unitId}`,
                title: 'Asset Health',
                subtitle: selectedUnitData?.title || 'Unknown Unit',
              })
            }
            style={[styles.chartContainer]}>
            <GaugeChart
              title="Asset Health Indicator"
              loading={loadingAhi}
              value={
                typeof assetHealthIndicatorValue === 'string'
                  ? +assetHealthIndicatorValue || 0
                  : assetHealthIndicatorValue || 0
              }
            />
          </TouchableOpacity>
          {false && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('reliability-details', {
                  unitId: `${selectedUnitData?.unitId}`,
                  title: 'Reliability Analysis',
                  subtitle: selectedUnitData?.title || 'Unknown Unit',
                })
              }
              style={[styles.chartContainer]}>
              <GaugeChart
                title="Reliability Indicator"
                value={100}
                loading={loadingAhi}
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Anomaly Detection</Typography>
          {loadingAnomalyData || !selectedUnit ? (
            <Skeleton height={scale(146)} width="100%" />
          ) : (
            <>
              <View className="flex-row justify-between gap-x-4">
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Anomaly Detection',
                      unitId: `${selectedUnitData?.unitId}`,
                      subtitle: selectedUnitData?.title || 'Unknown Unit',
                      type: 'open',
                    })
                  }
                  title={`${anomalyData?.new || 0}`}
                  variant="error"
                  subtitle="NEW"
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
                      title: 'Anomaly Detection',
                      unitId: `${selectedUnitData?.unitId}`,
                      subtitle: selectedUnitData?.title || 'Unknown Unit',
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
              </View>
              <View className="flex-row flex-wrap justify-between gap-x-0">
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Anomaly Detection',
                      unitId: `${selectedUnitData?.unitId}`,
                      subtitle: selectedUnitData?.title || 'Unknown Unit',
                      type: 'awaiting',
                    })
                  }
                  title={`${anomalyData?.awaiting || 0}`}
                  variant="default"
                  subtitle="AWAITING"
                  style={{
                    alignItems: 'center',
                    padding: 0,
                  }}
                />
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Anomaly Detection',
                      unitId: `${selectedUnitData?.unitId}`,
                      subtitle: selectedUnitData?.title || 'Unknown Unit',
                      type: 'in-progress',
                    })
                  }
                  title={`${anomalyData?.inprogress || 0}`}
                  variant="default"
                  subtitle="IN PROGRESS"
                  style={{
                    alignItems: 'center',
                    padding: 0,
                  }}
                />
                <Card
                  onPress={() =>
                    navigation.navigate('case-details', {
                      title: 'Anomaly Detection',
                      unitId: `${selectedUnitData?.unitId}`,
                      subtitle: selectedUnitData?.title || 'Unknown Unit',
                      type: 'closed',
                    })
                  }
                  title={`${anomalyData?.closed || 0}`}
                  variant="default"
                  subtitle="CLOSED"
                  style={{
                    alignItems: 'center',
                    padding: 0,
                  }}
                />
              </View>
            </>
          )}
        </View>
        {false && (
          <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
            <Typography weight="semibold">Failure Prediction</Typography>
            <View className="flex-row justify-between gap-x-4">
              <Card
                onPress={() =>
                  navigation.navigate('case-details', {
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'open',
                  })
                }
                title="0"
                variant="error"
                subtitle="NEW"
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
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'open',
                  })
                }
                title="20"
                variant="info"
                subtitle="OPEN"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: COLORS.border.light,
                  alignItems: 'center',
                }}
              />
            </View>
            <View className="flex-row flex-wrap justify-between gap-x-0">
              <Card
                onPress={() =>
                  navigation.navigate('case-details', {
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'awaiting',
                  })
                }
                title="30"
                variant="default"
                subtitle="AWAITING"
                style={{
                  alignItems: 'center',
                  padding: 0,
                }}
              />
              <Card
                onPress={() =>
                  navigation.navigate('case-details', {
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'in-progress',
                  })
                }
                title="50"
                variant="default"
                subtitle="IN PROGRESS"
                style={{
                  alignItems: 'center',
                  padding: 0,
                }}
              />
              <Card
                onPress={() =>
                  navigation.navigate('case-details', {
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'completed',
                  })
                }
                title="80"
                variant="default"
                subtitle="COMPLETED"
                style={{
                  alignItems: 'center',
                  padding: 0,
                }}
              />
              <Card
                onPress={() =>
                  navigation.navigate('case-details', {
                    title: 'Failure Prediction',
                    unitId: `${selectedUnitData?.unitId}`,
                    subtitle: selectedUnitData?.title || 'Unknown Unit',
                    type: 'closed',
                  })
                }
                title="120"
                variant="default"
                subtitle="CLOSED"
                style={{
                  alignItems: 'center',
                  padding: 0,
                }}
              />
            </View>
          </View>
        )}
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
