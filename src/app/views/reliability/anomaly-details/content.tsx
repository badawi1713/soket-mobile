import Chip from '@/components/Chip';
import IconButton from '@/components/IconButton';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {
  type Item,
  handleGetAnomalyDetailsDataApi,
} from '@/utils/api/anomaly-details';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Share,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {toast} from 'sonner-native';

type ScreenProps = {
  title: 'new' | 'open' | 'closed' | 'awaiting' | 'in progress' | 'completed';
  unitId: string;
};

const CaseItem = React.memo(
  ({
    item,
    title,
    onShare,
  }: {
    item: Item;
    title: 'new' | 'open' | 'closed' | 'awaiting' | 'in progress' | 'completed';
    onShare: () => void;
  }) => {
    const variantStatus: {
      new: 'error';
      open: 'accent';
      closed: 'secondary';
      awaiting: 'warning';
      'in progress': 'info';
      completed: 'success';
    } = {
      new: 'error',
      open: 'accent',
      closed: 'secondary',
      awaiting: 'warning',
      'in progress': 'info',
      completed: 'success',
    };

    return (
      <View className="px-5 py-2 rounded-md bg-background-paper">
        <View className="flex-row flex-wrap items-center w-full gap-2">
          <Chip
            color={+item?.level < 4 ? 'error' : 'warning'}
            variant="contained"
            size="small"
            shape="rectangular"
            style={{width: 'auto'}}
            text={`${item?.level}`}
          />
          <Chip
            color={item?.type === 'A' ? 'error' : 'warning'}
            variant="contained"
            size="small"
            shape="rectangular"
            style={{width: 'auto'}}
            text={`${item?.type}`}
          />
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
            text={`${item?.anomalyCount || 0}`}
          />
          <Chip
            color="primary"
            variant="contained"
            size="small"
            shape="rectangular"
            style={{width: 'auto'}}
            text={`${item?.anomalyEvent || 0}`}
          />
        </View>
        <View className="mt-4 mb-3">
          <Typography variant="body2">{item?.description || '-'}</Typography>
        </View>
        <View className="flex-row items-end justify-between gap-x-2">
          <View className="flex-1">
            <Typography variant="caption">{item?.equipment}</Typography>
            <Typography variant="caption">{item?.time}</Typography>
          </View>
          {false && (
            <IconButton
              buttonStyle="normal"
              onPress={onShare}
              iconColor={COLORS.common.black}
              icon="share-social"
              size="small"
            />
          )}
          <Chip
            color={variantStatus[title]}
            variant="contained"
            size="small"
            shape="rectangular"
            style={{width: 'auto', marginLeft: 'auto'}}
            text={title.replace('-', ' ').toUpperCase()}
          />
        </View>
      </View>
    );
  },
);

const Content = ({title = 'open', unitId = ''}: ScreenProps) => {
  const {bottom} = useSafeAreaInsets();

  const [data, setData] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setPage(0);
    setData([]);
    setTotal(0);
    setLoading(true);
    handleGetAnomalyDetailsDataApi({unitId, status: title, page: 0})
      .then(res => {
        setData(res.content);
        setTotal(res.total || 0);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setLoading(false));
  }, [unitId, title]);

  useEffect(() => {
    if (page === 0) return;
    setIsFetchingMore(true);
    handleGetAnomalyDetailsDataApi({unitId, status: title, page})
      .then(res => {
        setData(prev => [...prev, ...res.content]);
        setTotal(res.total || 0);
      })
      .catch(() => toast.error('Failed to load data'))
      .finally(() => setIsFetchingMore(false));
  }, [page, title, unitId]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(0);
    handleGetAnomalyDetailsDataApi({unitId, status: title, page: 0})
      .then(res => {
        setData(res.content);
        setTotal(res.total || 0);
      })
      .catch(() => toast.error('Failed to refresh'))
      .finally(() => setRefreshing(false));
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Share this link: http://10.7.1.116',
      });
    } catch (_) {
      toast.error('Error sharing');
    }
  };

  const renderItem = ({item}: {item: Item}) => (
    <CaseItem item={item} title={title} onShare={onShare} />
  );

  const renderEmpty = () => {
    if (loading) {
      return [1, 2, 3].map(i => (
        <Skeleton key={i} width={'100%'} height={scale(120)} />
      ));
    }

    if (data.length === 0) {
      return (
        <View className="px-5 py-2 rounded-md bg-background-paper">
          <View
            style={{height: scale(120)}}
            className="flex-col items-center justify-center w-full gap-x-2">
            <Typography variant="caption" className="text-center">
              No data available
            </Typography>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${index}-${item?.caseId}`}
      contentContainerStyle={{
        flexGrow: 1,
        paddingBottom: bottom || 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        gap: 16,
      }}
      refreshControl={
        <RefreshControl
          colors={[COLORS.primary.main]}
          tintColor={COLORS.secondary.main}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={
        data.length < total ? (
          isFetchingMore ? (
            <ActivityIndicator color={COLORS.primary.main} size={20} />
          ) : null
        ) : null
      }
      onEndReached={() => {
        if (!isFetchingMore && data.length < total) {
          setPage(prev => prev + 1);
        }
      }}
      onEndReachedThreshold={0.3}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default Content;
