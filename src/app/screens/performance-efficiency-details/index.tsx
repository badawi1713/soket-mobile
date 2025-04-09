import type {RootParamList} from '@/app/routes';
import AuxiliaryPower from '@/app/views/performance-efficiency-details/components/auxiliary-power';
import Efficiency from '@/app/views/performance-efficiency-details/components/efficiency';
import EnergyLoss from '@/app/views/performance-efficiency-details/components/energy-loss-analysis';
import PerformanceSummary from '@/app/views/performance-efficiency-details/components/performance-summary';
import {COLORS} from '@/constants/colors';
import {FONTS} from '@/constants/fonts';
import type {RouteProp} from '@react-navigation/native';
import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';

type ScreenProps = {
  route: RouteProp<RootParamList, 'performance-efficiency-details'>;
};

const routes = [
  {key: 'performance', title: 'Performance Summary'},
  {key: 'efficiency', title: 'Efficiency'},
  {key: 'energy-loss', title: 'Energy-Loss Analysis'},
  {key: 'aux-power', title: 'Auxiliary Power'},
];

const Screen = (props: ScreenProps) => {
  const layout = useWindowDimensions();
  const { unitId } = props.route.params

  const [index, setIndex] = useState(0);

  const renderScene = SceneMap({
    performance: () => <PerformanceSummary unitId={unitId} />,
    efficiency: () => <Efficiency unitId={unitId} />,
    'energy-loss': () => <EnergyLoss unitId={unitId} />,
    'aux-power': () => <AuxiliaryPower unitId={unitId} />,
  });

  return (
    <TabView
      lazy
      commonOptions={{
        labelStyle: {
          fontFamily: FONTS['oxanium-medium'],
          fontSize: moderateScale(10.5),
        },
      }}
      swipeEnabled
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          scrollEnabled
          indicatorStyle={{backgroundColor: COLORS.primary.main, height: 3}}
          style={{backgroundColor: COLORS.common.white}}
          activeColor={COLORS.primary.main}
          inactiveColor={COLORS.secondary.main}
        />
      )}
      style={{
        backgroundColor: COLORS.background.main,
      }}
    />
  );
};

export default Screen;
