import Accordion from '@/components/Accordion';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AirHeater from './air-heater';
import Boiler from './boiler';
import Condenser from './condenser';
import Hph from './hph';
import SteamTurbine from './steam-turbine';
import UnitPerformance from './unit-performance';

const Efficiency = ({unitId = ''}) => {
  const {bottom} = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string[]>(['unit-performance']);

  const handleExpanded = (id: string) => {
    setExpanded(prevState =>
      prevState.includes(id)
        ? prevState.filter(item => item !== id)
        : [...prevState, id],
    );
  };

  const isExpanded = (id: string): boolean => !!expanded.includes(id);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 0, paddingBottom: bottom}}>
      <Accordion
        onHeaderPress={() => handleExpanded('unit-performance')}
        expanded={isExpanded('unit-performance')}
        title="Unit Performance">
        <UnitPerformance unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('boiler')}
        expanded={isExpanded('boiler')}
        title="Boiler Performance">
        <Boiler unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('steam-turbine')}
        expanded={isExpanded('steam-turbine')}
        title="Steam Turbine Performance">
        <SteamTurbine unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('condenser')}
        expanded={isExpanded('condenser')}
        title="Condenser Performance">
        <Condenser unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('air-heater')}
        expanded={isExpanded('air-heater')}
        title="Air Heater Performance">
        <AirHeater unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('hph')}
        expanded={isExpanded('hph')}
        title="HPH Performance">
        <Hph unitId={unitId} />
      </Accordion>
    </ScrollView>
  );
};

export default Efficiency;
