import Chip from '@/components/Chip';
import IconButton from '@/components/IconButton';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { type Item, handleGetCaseDetailsDataApi } from '@/utils/api/case-details';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Share, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { toast } from 'sonner-native';

type ScreenProps = {
  title: 'open' | 'closed' | 'awaiting' | 'in progress' | 'completed';
  unitId: string;
};

const Content = ({title = 'open', unitId = ''}: ScreenProps) => {
  const variantStatus: {
    open: 'error';
    closed: 'secondary';
    awaiting: 'warning';
    'in progress': 'info';
    completed: 'success';
  } = {
    open: 'error',
    closed: 'secondary',
    awaiting: 'warning',
    'in progress': 'info',
    completed: 'success',
  };

  const {bottom} = useSafeAreaInsets();

  const [data, setData] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchInitialData = useCallback(async () => {
    setLoading(true);
    const response = await handleGetCaseDetailsDataApi({
      unitId: unitId,
      status: title,
    });
    setData(response.content);
    setLoading(false);
  }, [title, unitId]);

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

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Share this link: http://10.7.1.116',
      });
    } catch (_) {
      toast.error('Error sharing');
    }
  };

  return (
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
        paddingBottom: bottom || 16,
        paddingHorizontal: 16,
        paddingTop: 16,
      }}>
      <View className="flex-1 gap-y-4">
        {loading || refreshing ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
            <Skeleton key={item} width={'100%'} height={scale(120)} />
          ))
        ) : data?.length < 1 ? (
          <View className="px-5 py-2 rounded-md bg-background-paper">
            <View
              style={{height: scale(120)}}
              className="flex-col items-center justify-center w-full gap-x-2">
              <Typography className="text-center">No data available</Typography>
            </View>
          </View>
        ) : (
          data?.map((item, index) => {
            return (
              <View
                key={`${index}-${item?.caseId}`}
                className="px-5 py-2 rounded-md bg-background-paper">
                <View className="flex-row items-center w-full gap-x-2">
                  <Chip
                    color="primary"
                    variant="contained"
                    size="small"
                    shape="rectangular"
                    style={{width: 'auto'}}
                    text={`#${item?.caseId}`}
                  />
                  <Chip
                    color="primary"
                    variant="contained"
                    size="small"
                    shape="rectangular"
                    style={{width: 'auto'}}
                    text={`${item?.casePlant}`}
                  />
                  <Chip
                    color="primary"
                    variant="contained"
                    size="small"
                    shape="rectangular"
                    style={{width: 'auto'}}
                    text={item?.caseType || '-'}
                  />
                  <Chip
                    color={variantStatus[title] || ''}
                    variant="contained"
                    size="small"
                    shape="rectangular"
                    style={{width: 'auto', marginLeft: 'auto'}}
                    text={title.replace('-', ' ').toUpperCase()}
                  />
                </View>
                <View className="mt-4 mb-3">
                  <Typography>Condeser Press</Typography>
                </View>
                <View className="flex-row items-end justify-between gap-x-2">
                  <View className="flex-1">
                    <Typography variant="caption">
                      {item?.descr?.join('')}
                    </Typography>
                    <Typography variant="caption">
                      {item?.caseUnit}
                      {/* {format(new Date(), 'MMM dd yyyy HH:mm')} */}
                    </Typography>
                    <Typography variant="caption">
                      {`${item?.caseName}`}{' '}
                    </Typography>
                  </View>

                  <IconButton
                    buttonStyle="normal"
                    onPress={() => onShare()}
                    iconColor={COLORS.common.black}
                    icon="share-social"
                    size="small"
                  />
                </View>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
};

export default Content;
