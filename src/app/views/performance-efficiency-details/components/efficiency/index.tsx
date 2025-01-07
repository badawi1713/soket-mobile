import Accordion from '@/components/Accordion';
import CommingSoon from '@/components/ComingSoon';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UnitPerformance from './unit-performance';

const Efficiency: React.FC = () => {
	const { bottom } = useSafeAreaInsets();
	const [expanded, setExpanded] = useState<string[]>([]);

	const handleExpanded = (id: string) => {
		setExpanded((prevState) => (prevState.includes(id) ? prevState.filter((item) => item !== id) : [...prevState, id]));
	};

	const isExpanded = (id: string): boolean => !!expanded.includes(id);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 0, paddingBottom: bottom }}>
			<Accordion
				onHeaderPress={() => handleExpanded('unit-performance')}
				expanded={isExpanded('unit-performance')}
				title="Unit Performance"
			>
				<UnitPerformance />
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('boiler-perf')}
				expanded={isExpanded('boiler-perf')}
				title="Boiler Performance"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('steam-turbine-perf')}
				expanded={isExpanded('steam-turbine-perf')}
				title="Steam Turbine Performance"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('condenser-perf')}
				expanded={isExpanded('condenser-perf')}
				title="Condenser Performance"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('air-heater-perf')}
				expanded={isExpanded('air-heater-perf')}
				title="Air Heater Performance"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
			<Accordion
				onHeaderPress={() => handleExpanded('hph-perf')}
				expanded={isExpanded('hph-perf')}
				title="HPH Performance"
			>
				<View className="h-40 bg-background-paper">
					<CommingSoon />
				</View>
			</Accordion>
		</ScrollView>
	);
};

export default Efficiency;
