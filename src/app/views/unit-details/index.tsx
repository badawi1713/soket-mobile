import type {AuthNavigationProp} from '@/app/routes';
import Card from '@/components/Card';
import GaugeChart from '@/components/GaugeChart';
import SwitchButton from '@/components/SwitchButton';
import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';

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
};

const Content = ({plantName}: ContentProps) => {
  const navigation = useNavigation<AuthNavigationProp>();

  const handleSwitchChange = (value: string) => {};

  const {bottom} = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-background-main">
      <ScrollView
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
          <View style={[styles.chartContainer]}>
            <GaugeChart title="Asset Health Indicator" />
          </View>
        </View>

        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Case Status</Typography>
          <View className="flex-row justify-between gap-x-4">
            <Card
              onPress={() =>
                navigation.navigate('case-details', {
                  title: 'Case Management',
                  subtitle: plantName,
                  type: 'awaiting',
                })
              }
              title="20"
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
                  subtitle: plantName,
                  type: 'in-progress',
                })
              }
              title="120"
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
                  subtitle: plantName,
                  type: 'completed',
                })
              }
              title="20"
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
                  subtitle: plantName,
                  type: 'closed',
                })
              }
              title="120"
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
