import {anomalyDetailReducer} from './anomaly-detail-slice';
import {anomalyStatisticReducer} from './anomaly-statistic-slice';
import {assetHealthIndicatorReducer} from './asset-health-indicator-slice';
import {badActorChartReducer} from './bad-actor-chart-slice';

const reliabilitySlices = {
  anomalyDetailReducer,
  anomalyStatisticReducer,
  assetHealthIndicatorReducer,
  badActorChartReducer,
};

export default reliabilitySlices;
