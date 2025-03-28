import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Typography from '@/components/Typography';
import {format} from 'date-fns';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS} from '../../../constants/colors';
import EfficiencyChart from './components/EfficiencyChart';

const EFF_STATUS = [
  {
    title: 'Baseline',
    value: '80%',
  },
  {
    title: 'Current',
    value: '82.5%',
  },
  {
    title: 'Improvement',
    value: '2.5%',
  },
];

const SOOTBLOW_STATUS = [
  {
    title: 'Operation',
    value: 'Enable',
  },
  {
    title: 'Watchdog',
    value: 'Connected',
  },
  {
    title: 'Safeguard',
    value: 'Ready',
  },
];

const COMBUSTION_STATUS = [
  {
    title: 'Operation',
    value: 'Disable',
  },
  {
    title: 'Watchdog',
    value: 'Disconnected',
  },
  {
    title: 'Safeguard',
    value: 'Not Ready',
  },
];

const Content = () => {
  const [selectedUnit, setSelectedUnit] = React.useState('');

  return (
    <View className="flex-1 bg-background-main">
      <View className="px-4 pb-4 bg-background-paper">
        <View className="h-12">
          <Autocomplete
            setSelectedItem={setSelectedUnit}
            selectedItem={selectedUnit}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}>
        <LastUpdatedInfo value={format(new Date(), 'MMM dd, yyyy  HH:mm')} />
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Efficiency Status</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {EFF_STATUS?.map(item => (
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
                    `${item?.title}`.includes('Improvement') ? 'text-white' : ''
                  }
                  variant="body2"
                  weight="medium">
                  {item?.title}
                </Typography>
                <Typography
                  className={
                    `${item?.title}`.includes('Improvement') ? 'text-white' : ''
                  }
                  variant="body2"
                  weight="bold">
                  {item?.value || 0}
                </Typography>
              </Card>
            ))}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Efficiency Chart</Typography>
          <View className="w-full bg-slate-200">
            <EfficiencyChart />
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Sootblow Optimization</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-2">
            {SOOTBLOW_STATUS?.map(item => (
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
            ))}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Combustion Optimization</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-2">
            {COMBUSTION_STATUS?.map(item => (
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
            ))}
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
