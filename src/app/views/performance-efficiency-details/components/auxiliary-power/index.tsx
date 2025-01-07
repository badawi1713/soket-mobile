import Accordion from '@/components/Accordion';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuxiliaryPowerGapAnalysis from './auxiliary-power-gap-analysis';
import ParetoAuxiliaryPower from './pareto-auxiliary-power';

const AuxiliaryPower: React.FC = () => {
	const { bottom } = useSafeAreaInsets();
	const [expanded, setExpanded] = useState<string[]>([]);

	const handleExpanded = (id: string) => {
		setExpanded((prevState) => (prevState.includes(id) ? prevState.filter((item) => item !== id) : [...prevState, id]));
	};

	const isExpanded = (id: string): boolean => !!expanded.includes(id);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 0, paddingBottom: bottom }}>
			<Accordion
				onHeaderPress={() => handleExpanded('aux-power-gap-analysis')}
				expanded={isExpanded('aux-power-gap-analysis')}
				subtitle="kW"
				title="Auxiliary Power Gap Analysis"
			>
				<AuxiliaryPowerGapAnalysis />
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('pareto-aux-power')}
				expanded={isExpanded('pareto-aux-power')}
				title="Pareto Auxiliary Power"
			>
				<ParetoAuxiliaryPower />
			</Accordion>
		</ScrollView>
	);
};

export default AuxiliaryPower;
