import Accordion from '@/components/Accordion';
import CommingSoon from '@/components/ComingSoon';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UnitSummary from './unit-summary';

const PerformanceSummary: React.FC = () => {
	const { bottom } = useSafeAreaInsets();
	const [expanded, setExpanded] = useState<string[]>([]);

	const handleExpanded = (id: string) => {
		setExpanded((prevState) => (prevState.includes(id) ? prevState.filter((item) => item !== id) : [...prevState, id]));
	};

	const isExpanded = (id: string): boolean => !!expanded.includes(id);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 0, paddingBottom: bottom }}>
			<Accordion
				onHeaderPress={() => handleExpanded('unit-summary')}
				expanded={isExpanded('unit-summary')}
				title="Unit Summary"
			>
				<UnitSummary />
			</Accordion>
			<Accordion onHeaderPress={() => handleExpanded('boiler')} expanded={isExpanded('boiler')} title="Boiler">
				<UnitSummary />
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('steam-turbine')}
				expanded={isExpanded('steam-turbine')}
				title="Steam Turbine"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion onHeaderPress={() => handleExpanded('condenser')} expanded={isExpanded('condenser')} title="Condenser">
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('air-heater')}
				expanded={isExpanded('air-heater')}
				title="Air Heater"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion onHeaderPress={() => handleExpanded('hph')} expanded={isExpanded('hph')} title="HPH">
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
		</ScrollView>
	);
};

export default PerformanceSummary;
