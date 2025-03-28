import commonSlices from './common-slices';
import dashboardSlices from './dashboard-slices';
import efficiencySlices from './efficiency-slices';
import reliabilitySlices from './reliability-slices';

const slices = {
  ...commonSlices,
  ...dashboardSlices,
  ...efficiencySlices,
  ...reliabilitySlices,
};

export default slices;
