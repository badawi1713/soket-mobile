import {anomalyStatisticReducer} from './anomaly-statistic-slice';
import {assetHealthIndicatorReducer} from './asset-health-indicator-slice';
import {badActorChartReducer} from './bad-actor-chart-slice';

const reliabilitySlices = {
  anomalyStatisticReducer,
  assetHealthIndicatorReducer,
  badActorChartReducer,
};

export default reliabilitySlices;
