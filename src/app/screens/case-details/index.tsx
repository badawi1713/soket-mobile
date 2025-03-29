import type { RootParamList } from '@/app/routes';
import Content from '@/app/views/case-details';
import { COLORS } from '@/constants/colors';
import { FONTS } from '@/constants/fonts';
import type { RouteProp } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

type ScreenProps = {
  route: RouteProp<RootParamList, 'case-details'>;
};

const titleToIndex = {
  open: 0,
  awaiting: 1,
  'in progress': 2,
  completed: 3,
  closed: 4,
};

const routes = [
  {key: 'open', title: 'Open'},
  {key: 'awaiting', title: 'Awaiting'},
  {key: 'in-progress', title: 'In Progress'},
  {key: 'completed', title: 'Completed'},
  {key: 'closed', title: 'Closed'},
];

const Screen = (props: ScreenProps) => {
  const {type = 'open', unitId} = props.route.params;

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const initialIndex = useMemo(() => titleToIndex[type] || 0, [type]);

  useEffect(() => {
    const renderTab = setTimeout(() => {
      return setIndex(initialIndex);
    }, 0);

    return () => {
      clearTimeout(renderTab);
    };
  }, [initialIndex]);

  const renderScene = SceneMap({
    open: () => <Content unitId={unitId} title="open" />,
    awaiting: () => <Content unitId={unitId} title="awaiting" />,
    'in-progress': () => <Content unitId={unitId} title="in progress" />,
    completed: () => <Content unitId={unitId} title="completed" />,
    closed: () => <Content unitId={unitId} title="closed" />,
  });

  return (
    <TabView
      lazy
      commonOptions={{
        labelStyle: {
          fontFamily: FONTS['oxanium-medium'],
          fontSize: moderateScale(14),
        },
      }}
      swipeEnabled
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={index => {
        setIndex(index);
      }}
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
      style={{}}
    />
  );
};

export default Screen;
