import Typography from '@/components/Typography';
import {COLORS} from '@/constants/colors';
import useGetPerformanceSummaryData from '@/hooks/performance-efficiency-details/useGetPerformanceSummaryData';
import type {DataItem} from '@/utils/api/performance-efficiency-details/performance-summary';
import {compareValues} from '@/utils/helpers';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

type TableRow = DataItem;

type SortConfig = {
  key: keyof TableRow | null;
  direction: 'ascending' | 'descending' | null;
};

const columns: {key: keyof DataItem; label: string}[] = [
  {key: 'paramName', label: 'Parameter'},
  {key: 'unit', label: 'Unit'},
  {key: 'vMeasure', label: 'Measured'},
  {key: 'vHeatBalance', label: 'Heat Balance'},
];

const Condenser = ({unitId = ''}) => {
  const {data, loading, error} = useGetPerformanceSummaryData(unitId, 4);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });

  const tableData: TableRow[] = data || [];

  const sortedTableData = [...tableData].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0;
    return compareValues(
      a[sortConfig.key],
      b[sortConfig.key],
      sortConfig.direction,
    );
  });

  const getArrow = (key: string) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? '▲' : '▼';
  };

  const handleSort = (key: keyof TableRow) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({key, direction});
  };

  const renderItem = ({item, index}: {item: TableRow; index: number}) => (
    <View
      key={item?.no}
      style={[
        styles.row,
        {
          backgroundColor:
            index % 2 === 0 ? COLORS.background.paper : COLORS.background.main,
        },
      ]}>
      <Typography variant="smallText" weight="bold" style={styles.cell}>
        {item.paramName || '-'}
      </Typography>
      <Typography variant="smallText" style={styles.cell}>
        {item.unit || '-'}
      </Typography>
      <Typography variant="smallText" style={styles.cell}>
        {item.vMeasure || 'N/A'}
      </Typography>
      <Typography variant="smallText" style={styles.cell}>
        {item.vHeatBalance || 'N/A'}
      </Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.header]}>
        {columns.map(({key, label}) => (
          <TouchableOpacity
            key={key}
            style={styles.cell}
            onPress={() => handleSort(key)}>
            <Typography
              style={styles.headerText}
              color={sortConfig.key === key ? COLORS.primary.main : ''}
              weight="bold">
              {label} {getArrow(key)}
            </Typography>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <View style={styles.container}>
          <View className="flex flex-col items-center justify-center min-h-24">
            <Typography variant="body2">Loading ...</Typography>
          </View>
        </View>
      ) : error ? (
        <View style={styles.container}>
          <View className="flex flex-col items-center justify-center min-h-24">
            <Typography variant="body2">
              {error || 'Sorry, something went wrong'}
            </Typography>
          </View>
        </View>
      ) : sortedTableData?.length < 1 ? (
        <View style={styles.container}>
          <View className="flex flex-col items-center justify-center min-h-24">
            <Typography variant="body2">Sorry, no data is available</Typography>
          </View>
        </View>
      ) : (
        sortedTableData.map((item, index) => renderItem({item, index}))
      )}
    </View>
  );
};

export default Condenser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.paper,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  header: {
    backgroundColor: COLORS.background.main,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(11),
  },
  headerText: {
    fontSize: moderateScale(10.5),
    textAlign: 'center',
  },
});
