import React from 'react';
import { SceneMap } from 'react-native-tab-view';
import AuxiliaryPower from './components/auxiliary-power';
import Efficiency from './components/efficiency';
import EnergyLoss from './components/energy-loss-analysis';
import PerformanceSummary from './components/performance-summary';

const renderScene = SceneMap({
	performance: () => <PerformanceSummary />,
	efficiency: () => <Efficiency />,
	'energy-loss': () => <EnergyLoss />,
	'aux-power': () => <AuxiliaryPower />,
});

export default renderScene;
