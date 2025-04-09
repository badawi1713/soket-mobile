import Accordion from '@/components/Accordion';
import {useState} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ActualHeatLoss from './actual-heat-loss';
import ParetoHeatLosses from './pareto-heat-losses';

const EnergyLoss = ({unitId = ''}) => {
  const {bottom} = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<string[]>(['heat-loss']);

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
        onHeaderPress={() => handleExpanded('heat-loss')}
        expanded={isExpanded('heat-loss')}
        title="Actual Heat Losses">
        <ActualHeatLoss unitId={unitId} />
      </Accordion>
      <Accordion
        onHeaderPress={() => handleExpanded('pareto-heat-losses')}
        expanded={isExpanded('pareto-heat-losses')}
        title="Pareto Heat Losses">
        <ParetoHeatLosses unitId={unitId} />
      </Accordion>
    </ScrollView>
  );
};

export default EnergyLoss;
