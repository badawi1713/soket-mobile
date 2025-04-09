import Accordion from '@/components/Accordion';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AirHeater from './air-heater';
import Boiler from './boiler';
import Condenser from './condenser';
import Hph from './hph';
import SteamTurbine from './steam-turbine';
import UnitSummary from './unit-summary';

const PerformanceSummary = ({unitId = ''}) => {
  const {bottom} = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string[]>(['unit-summary']);

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
        onHeaderPress={() => handleExpanded('unit-summary')}
        expanded={isExpanded('unit-summary')}
        title="Unit Summary">
        <UnitSummary unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('boiler')}
        expanded={isExpanded('boiler')}
        title="Boiler">
        <Boiler unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('steam-turbine')}
        expanded={isExpanded('steam-turbine')}
        title="Steam Turbine">
        <SteamTurbine unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('condenser')}
        expanded={isExpanded('condenser')}
        title="Condenser">
        <Condenser unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('air-heater')}
        expanded={isExpanded('air-heater')}
        title="Air Heater">
        <AirHeater unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('hph')}
        expanded={isExpanded('hph')}
        title="HPH">
        <Hph unitId={unitId} />
      </Accordion>
    </ScrollView>
  );
};

export default PerformanceSummary;
