import type { AuthNavigationProp } from '@/app/routes';
import Autocomplete from '@/components/Autocomplete';
import Card from '@/components/Card';
import LastUpdatedInfo from '@/components/LastUpdatedInfo';
import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { default as Icon } from '@react-native-vector-icons/ionicons';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';

const MEASURED_KPI = [
  {
    title: 'NPHR-LHV',
    value: 3444,
    unit: 'kcal/kWh',
  },
  {
    title: 'NPHR-HHV',
    value: 4550,
    unit: 'kcal/kWh',
  },
  {
    title: 'Net Power',
    value: 4452,
    unit: 'MW',
  },
  {
    title: 'Gross Power',
    value: 288,
    unit: 'MW',
  },
  {
    title: 'Gross Eff',
    value: '60%',
    unit: '',
  },
  {
    title: 'GPHR',
    value: 450,
    unit: 'kcal/kWh',
  },
  {
    title: 'Fuel Flow',
    value: 200,
    unit: 't/h',
  },
  {
    title: 'Aux Power',
    value: 15000,
    unit: 'MW',
  },
];

const HEAT_BALANCE_KPI = [
  {
    title: 'NPHR-LHV',
    value: 3450,
    unit: 'kcal/kWh',
  },
  {
    title: 'NPHR-HHV',
    value: 4550,
    unit: 'kcal/kWh',
  },
  {
    title: 'Net Power',
    value: 4452,
    unit: 'MW',
  },
  {
    title: 'Gross Power',
    value: 288,
    unit: 'MW',
  },
  {
    title: 'Gross Eff',
    value: '60%',
    unit: '',
  },
  {
    title: 'GPHR',
    value: 450,
    unit: 'kcal/kWh',
  },
  {
    title: 'Fuel Flow',
    value: 200,
    unit: 't/h',
  },
  {
    title: 'Aux Power',
    value: 15000,
    unit: 'MW',
  },
];

const Content = () => {
  const navigation = useNavigation<AuthNavigationProp>();
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
          <Typography weight="semibold">Measured KPI</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {MEASURED_KPI?.map((item, index) => (
              <Card
                key={item.title}
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  justifyContent: 'space-between',
                  gap: 12,
                  backgroundColor:
                    index === 0 ? COLORS.secondary.light : 'transparent',
                  width: scale(68),
                }}>
                <Typography className="text-center" variant="smallText">
                  {item?.title}
                </Typography>
                <Typography
                  className="text-center"
                  variant="header6"
                  weight="medium">
                  {item?.value || 0}
                </Typography>
                <Typography
                  className="text-center"
                  color={COLORS.secondary.main}
                  variant="smallText">
                  {item?.unit}
                </Typography>
              </Card>
            ))}
          </View>
        </View>
        <View className="flex-col gap-4 p-4 rounded-lg bg-background-paper">
          <Typography weight="semibold">Heat Balance KPI</Typography>
          <View className="flex-row flex-wrap justify-between w-full gap-y-4">
            {HEAT_BALANCE_KPI?.map((item, index) => (
              <Card
                key={item.title}
                style={{
                  alignItems: 'center',
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  justifyContent: 'space-between',
                  gap: 12,
                  backgroundColor:
                    index === 0 ? COLORS.secondary.light : 'transparent',
                  width: scale(68),
                }}>
                <Typography className="text-center" variant="smallText">
                  {item?.title}
                </Typography>
                <Typography
                  className="text-center"
                  variant="header6"
                  weight="medium">
                  {item?.value || 0}
                </Typography>
                <Typography
                  className="text-center"
                  color={COLORS.secondary.main}
                  variant="smallText">
                  {item?.unit}
                </Typography>
              </Card>
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('performance-efficiency-details', {
              subtitle: 'PLTU Tanjung Awar-Awar - Unit 1',
              id: '1',
            })
          }
          className="flex-row items-center justify-between p-4 bg-white rounded-lg">
          <Typography variant="body2" weight="medium">
            Performance and Efficiency
          </Typography>
          <Icon size={18} name="arrow-up-right-box-outline" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Content;
