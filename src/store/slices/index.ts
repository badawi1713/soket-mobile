import commonSlices from './common-slices';
import dashboardSlices from './dashboard-slices';

const slices = {
  ...commonSlices,
  ...dashboardSlices,
};

export default slices;
