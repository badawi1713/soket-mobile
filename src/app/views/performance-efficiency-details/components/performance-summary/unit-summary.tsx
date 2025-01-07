import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

type TableRow = {
	id: string;
	parameter: string;
	unit: string;
	heatBalance: string;
	measure: string;
};

type SortConfig = {
	key: keyof TableRow | null;
	direction: 'ascending' | 'descending' | null;
};
const UnitSummary = () => {
	const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

	const tableData: TableRow[] = [
		{ id: '1', parameter: 'NPHR-LHV', unit: 'kcal/kWh', heatBalance: '24500', measure: '25000' },
		{ id: '2', parameter: 'NPHR-HHV', unit: 'kcal/kWh', heatBalance: '45000', measure: '500' },
		{ id: '3', parameter: 'Net Power', unit: 'MW', heatBalance: '500', measure: '500' },
		{ id: '4', parameter: 'Gross Power', unit: 'MW', heatBalance: '500', measure: '500' },
		{ id: '5', parameter: 'Gross Eff (LHV)', unit: '%', heatBalance: '500', measure: '500' },
		{ id: '6', parameter: 'GPHR', unit: 'kcal/kWh', heatBalance: '500', measure: '500' },
		{ id: '7', parameter: 'Fuel Flow', unit: 't/h', heatBalance: '500', measure: '500' },
		{ id: '8', parameter: 'Aux Power', unit: 'kcal/kWh', heatBalance: '500', measure: '500' },
	];

	const sortedTableData = [...tableData].sort((a, b) => {
		if (sortConfig.key) {
			const aValue = a[sortConfig.key];
			const bValue = b[sortConfig.key];
			if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
			if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
		}
		return 0;
	});

	const handleSort = (key: keyof TableRow) => {
		let direction: 'ascending' | 'descending' = 'ascending';
		if (sortConfig.key === key && sortConfig.direction === 'ascending') {
			direction = 'descending';
		}
		setSortConfig({ key, direction });
	};

	const renderItem = ({ item, index }: { item: TableRow; index: number }) => (
		<View
			key={item.id}
			style={[
				styles.row,
				{
					backgroundColor: index % 2 === 0 ? COLORS.background.paper : COLORS.background.main,
				},
			]}
		>
			<Typography variant="smallText" weight="bold" style={styles.cell}>
				{item.parameter}
			</Typography>
			<Typography variant="smallText" style={styles.cell}>
				{item.unit}
			</Typography>
			<Typography variant="smallText" style={styles.cell}>
				{item.heatBalance}
			</Typography>
			<Typography variant="smallText" style={styles.cell}>
				{item.measure}
			</Typography>
		</View>
	);

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={[styles.row, styles.header]}>
				<TouchableOpacity style={styles.cell} onPress={() => handleSort('parameter')}>
					<Typography
						style={styles.headerText}
						color={sortConfig.key === 'parameter' ? COLORS.primary.main : ''}
						weight="bold"
					>
						Parameter{' '}
						{sortConfig.key === 'parameter' && sortConfig.direction === 'ascending'
							? '▲'
							: sortConfig.key === 'parameter' && sortConfig.direction === 'descending'
								? '▼'
								: ''}
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity style={styles.cell} onPress={() => handleSort('unit')}>
					<Typography
						style={styles.headerText}
						color={sortConfig.key === 'unit' ? COLORS.primary.main : ''}
						weight="bold"
					>
						Unit{' '}
						{sortConfig.key === 'unit' && sortConfig.direction === 'ascending'
							? '▲'
							: sortConfig.key === 'unit' && sortConfig.direction === 'descending'
								? '▼'
								: ''}
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity style={styles.cell} onPress={() => handleSort('heatBalance')}>
					<Typography
						style={styles.headerText}
						color={sortConfig.key === 'heatBalance' ? COLORS.primary.main : ''}
						weight="bold"
					>
						Heat Balance{' '}
						{sortConfig.key === 'heatBalance' && sortConfig.direction === 'ascending'
							? '▲'
							: sortConfig.key === 'heatBalance' && sortConfig.direction === 'descending'
								? '▼'
								: ''}
					</Typography>
				</TouchableOpacity>
				<TouchableOpacity style={styles.cell} onPress={() => handleSort('measure')}>
					<Typography
						style={styles.headerText}
						color={sortConfig.key === 'measure' ? COLORS.primary.main : ''}
						weight="bold"
					>
						Measure{' '}
						{sortConfig.key === 'measure' && sortConfig.direction === 'ascending'
							? '▲'
							: sortConfig.key === 'measure' && sortConfig.direction === 'descending'
								? '▼'
								: ''}
					</Typography>
				</TouchableOpacity>
			</View>

			{/* Data */}
			{sortedTableData.map((item, index) => renderItem({ item, index }))}
		</View>
	);
};

export default UnitSummary;

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
