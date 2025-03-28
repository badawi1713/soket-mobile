import {anomalyStatisticReducer} from './anomaly-statistic-slice';
import {assetHealthIndicatorReducer} from './asset-health-indicator-slice';

const reliabilitySlices = {
  anomalyStatisticReducer,
  assetHealthIndicatorReducer,
};

export default reliabilitySlices;
