import {boilerEfficiencyChartReducer} from './boiler-efficiency-chart-slice';
import {boilerEfficiencyReducer} from './boiler-efficiency-statistic-slice';

const boilerAutoTuningSlices = {
  boilerEfficiencyReducer,
  boilerEfficiencyChartReducer,
};

export default boilerAutoTuningSlices;
