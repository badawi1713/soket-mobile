import Typography from '@/components/Typography';
import { COLORS } from '@/constants/colors';
import type Ionicons from '@react-native-vector-icons/ionicons';
import type React from 'react';
import type { FC, ReactNode } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';

interface CardProps {
	title: string; // Card title
	subtitle?: string; // Optional subtitle
	icon?: React.ComponentProps<typeof Ionicons>['name']; // Optional leading icon
	variant?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error'; // Card variant for colors
	children?: ReactNode; // Content inside the card
	style?: StyleProp<ViewStyle>; // Custom styles
	shadow?: boolean; // Whether to apply shadow
	value?: string;
}

const EfficiencyCard: FC<CardProps> = ({
	title,
	subtitle,
	value,
	variant = 'default',
	children,
	style,
	shadow = false,
}) => {
	// Variant-specific colors
	const variantColors = {
		default: {
			background: COLORS.background.paper,
			title: COLORS.light.icon,
			subtitle: COLORS.light.icon,
		},
		primary: {
			background: COLORS.background.paper,
			title: COLORS.primary.dark,
			subtitle: COLORS.primary.main,
		},
		success: {
			background: COLORS.background.paper,
			title: COLORS.success.dark,
			subtitle: COLORS.success.main,
		},
		info: {
			background: COLORS.background.paper,
			title: COLORS.info.dark,
			subtitle: COLORS.info.main,
		},
		warning: {
			background: COLORS.background.paper,
			title: COLORS.warning.dark,
			subtitle: COLORS.warning.main,
		},
		error: {
			background: COLORS.background.paper,
			title: COLORS.error.dark,
			subtitle: COLORS.error.main,
		},
	};

	const colors = variantColors[variant];

	return (
		<View
			style={[
				{
					backgroundColor: colors.background,
					padding: 16,
					borderRadius: 8,
				},
				shadow && {
					shadowColor: '#000',
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: 0.2,
					shadowRadius: 6,
					elevation: 5, // For Android
				},
				style,
			]}
		>
			{/* Header Section */}
			<Typography variant="body1" weight="bold" color={colors.subtitle}>
				{value}
			</Typography>

			<Typography variant="header5" weight="bold" color={colors.title}>
				{value}
			</Typography>

			{/* Subtitle Section */}
			{subtitle && (
				<Typography variant="caption" weight="semibold" color={colors.subtitle} className="text-center">
					{subtitle}
				</Typography>
			)}

			{/* Children (Card Content) */}
			{children}
		</View>
	);
};

export default EfficiencyCard;
