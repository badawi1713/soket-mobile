import Chip from '@/components/Chip';
import IconButton from '@/components/IconButton';
import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {type Item, handleGetCaseDetailsDataApi} from '@/utils/api/case-details';
import React, {useCallback, useEffect, useState} from 'react';
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
  title: 'open' | 'closed' | 'awaiting' | 'in progress' | 'completed';
  unitId: string;
};

const CaseItem = React.memo(
  ({
    item,
    title,
    onShare,
  }: {
    item: Item;
    title: 'open' | 'closed' | 'awaiting' | 'in progress' | 'completed';
    onShare: () => void;
  }) => {
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

    return (
      <View className="px-5 py-2 rounded-md bg-background-paper">
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
            color={variantStatus[title]}
            variant="contained"
            size="small"
            shape="rectangular"
            style={{width: 'auto', marginLeft: 'auto'}}
            text={title.replace('-', ' ').toUpperCase()}
          />
        </View>
        <View className="mt-4 mb-3">
          <Typography>{item?.descr?.join('')}</Typography>
        </View>
        <View className="flex-row items-end justify-between gap-x-2">
          <View className="flex-1">
            <Typography variant="caption">{item?.caseUnit}</Typography>
            <Typography variant="caption">{item?.caseName}</Typography>
          </View>
          <IconButton
            buttonStyle="normal"
            onPress={onShare}
            iconColor={COLORS.common.black}
            icon="share-social"
            size="small"
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
  handleGetCaseDetailsDataApi({ unitId, status: title, page: 0 })
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
  handleGetCaseDetailsDataApi({ unitId, status: title, page })
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
  handleGetCaseDetailsDataApi({ unitId, status: title, page: 0 })
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
