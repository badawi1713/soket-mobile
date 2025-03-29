import BarChart from '@/components/BarChart';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import {handleGetBadActorChartData} from '@/store/slices/reliability-slices/bad-actor-chart-slice/actions';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Content = ({unitId = ''}) => {
  const dispatch = useAppDispatch();
  const {bottom} = useSafeAreaInsets();

  const {data: barChartData, loading: loadingBarChart} = useAppSelector(
    state => state.badActorChartReducer,
  );

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchInitialData = useCallback(async () => {
    if (unitId) {
      dispatch(handleGetBadActorChartData({unitId: unitId}));
    }
  }, [unitId, dispatch]);

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
          <Typography weight="semibold">Bad Actor</Typography>
          <View style={[styles.chartContainer]}>
            <BarChart loading={loadingBarChart || refreshing} data={barChartData || []} />
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
    minHeight: 640,
    overflow: 'hidden',
    borderRadius: 8,
  },
});
