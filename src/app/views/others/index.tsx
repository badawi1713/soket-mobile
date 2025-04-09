import Skeleton from '@/components/Skeleton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import images from '@/constants/images';
import useGetOtherAppsData from '@/hooks/others/useGetOtherAppsData';
import React, {useCallback, useState} from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {toast} from 'sonner-native';

const openInAppBrowser = async (url: string) => {
  try {
    const isAvailable = await InAppBrowser.isAvailable();
    if (isAvailable) {
      await InAppBrowser.open(url, {
        dismissButtonStyle: 'close',
        preferredBarTintColor: COLORS.common.black,
        preferredControlTintColor: 'white',
        readerMode: false,
        animated: true,
        modalPresentationStyle: 'fullScreen',
        modalTransitionStyle: 'coverVertical',
        modalEnabled: true,
        enableBarCollapsing: false,
      });
    } else {
      toast.error(
        'InAppBrowser is not available in this device. Open with default browser.',
      );
      Linking.openURL(url);
    }
  } catch (_) {
    toast.error(
      'InAppBrowser is not available in this device. Open with default browser.',
    );
    Linking.openURL(url);
  }
};

const Content = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {data, loading, error, refetch} = useGetOtherAppsData();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  return (
    <View className="flex-1 bg-background-paper">
      <Typography variant="body1" weight="semibold" className="px-4">
        Featured Apps
      </Typography>
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
          paddingVertical: 16,
        }}>
        {!refreshing && loading ? (
          <View style={styles.container}>
            <View className="flex flex-col items-center justify-center gap-y-4 min-h-24">
              <Skeleton width="100%" height={84} />
              <Skeleton width="100%" height={84} />
              <Skeleton width="100%" height={84} />
            </View>
          </View>
        ) : error ? (
          <View style={styles.container}>
            <View className="flex flex-col items-center justify-center min-h-24">
              <Typography variant="body2">
                {error || 'Sorry, something went wrong'}
              </Typography>
            </View>
          </View>
        ) : data === null || data?.length < 1 ? (
          <View style={styles.container}>
            <View className="flex flex-col items-center justify-center min-h-24">
              <Typography variant="body2">
                Sorry, no data is available
              </Typography>
            </View>
          </View>
        ) : (
          data?.map((item, index) => {
            return (
              <TouchableOpacity
                key={item?.fIntId}
                className={`flex-row items-center gap-4 py-3 ${
                  data.length - 1 === index
                    ? 'border-none'
                    : 'border-b border-b-border-light'
                }`}
                onPress={() => openInAppBrowser(item?.fLink)}>
                <Image
                  className="w-12 h-12"
                  resizeMode="contain"
                  source={item?.fIcon ? {uri: item?.fIcon} : images.imgLogoApp}
                />
                <View className="flex-1">
                  <Typography variant="body1" weight="semibold">
                    {item?.fName || 'App name is unknown'}
                  </Typography>
                  {item?.fDescription && (
                    <Typography variant="caption">
                      {item?.fDescription || ''}
                    </Typography>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.paper,
  },
});
