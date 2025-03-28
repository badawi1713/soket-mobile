import boilerAutoTuningSlices from './boiler-auto-tuning-slices';
import commonSlices from './common-slices';
import dashboardSlices from './dashboard-slices';
import efficiencySlices from './efficiency-slices';
import reliabilitySlices from './reliability-slices';

const slices = {
  ...boilerAutoTuningSlices,
  ...commonSlices,
  ...dashboardSlices,
  ...efficiencySlices,
  ...reliabilitySlices,
};

export default slices;
