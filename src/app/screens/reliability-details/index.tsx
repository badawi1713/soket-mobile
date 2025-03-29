import type { RootParamList } from '@/app/routes';
import Content from '@/app/views/reliability-details';
import type { RouteProp } from '@react-navigation/native';
import React, { type FC } from 'react';

type ScreenProps = {
  route: RouteProp<RootParamList, 'reliability-details'>;
};

const Screen: FC<ScreenProps> = props => {
  return <Content unitId={props.route.params?.unitId} />;
};

export default Screen;
