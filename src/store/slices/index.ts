import commonSlices from './common-slices';
import dashboardSlices from './dashboard-slices';
import reliabilitySlices from './reliability-slices';

const slices = {
  ...commonSlices,
  ...dashboardSlices,
  ...reliabilitySlices
};

export default slices;
