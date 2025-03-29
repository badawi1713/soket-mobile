import type { RootParamList } from '@/app/routes';
import Content from '@/app/views/unit-details';
import type { RouteProp } from '@react-navigation/native';
import React from 'react';

type ScreenProps = {
  route: RouteProp<RootParamList, 'unit-details'>;
};

const Screen = (props: ScreenProps) => {
  return (
    <Content
      plantName={props.route.params.title}
      id={props.route.params.id}
      objectId={props.route.params.objectId}
    />
  );
};

export default Screen;
