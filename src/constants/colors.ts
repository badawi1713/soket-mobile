/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const COLORS = {
	light: {
		text: '#11181C',
		background: '#fff',
		tint: tintColorLight,
		icon: '#687076',
		tabIconDefault: '#687076',
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: '#ECEDEE',
		background: '#151718',
		tint: tintColorDark,
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: tintColorDark,
	},
	primary: {
		light: '#5AA9FF', // Lighter shade of primary color
		main: '#0061FF', // Main primary color
		dark: '#0041B3', // Darker shade of primary color
	},
	secondary: {
		light: '#E0E0E0', // A very light grey, almost white
		main: '#595959', // A neutral grey for the main color
		dark: '#808080', // A darker shade of grey
	},
	accent: {
		light: '#D1FFE9', // Lighter shade of accent color
		main: '#00E676', // Main accent color
		dark: '#00A152', // Darker shade of accent color
	},
	success: {
		light: '#81C784', // Lighter shade of success color
		main: '#4CAF50', // Main success color
		dark: '#388E3C', // Darker shade of success color
	},
	info: {
		light: '#64B5F6', // Lighter shade of info color
		main: '#2196F3', // Main info color
		dark: '#1565C0', // Darker shade of info color
	},
	warning: {
		light: '#FFD54F', // Lighter shade of warning color
		main: '#FFC107', // Main warning color
		dark: '#FFA000', // Darker shade of warning color
	},
	error: {
		light: '#E57373', // Lighter shade of error color
		main: '#F44336', // Main error color
		dark: '#D32F2F', // Darker shade of error color
	},
	black: {
		DEFAULT: '#000000',
		100: '#8C8E98',
		200: '#666876',
		300: '#191D31',
	},
	neutral: {
		light: '#F5F5F5',
		main: '#E0E0E0',
		dark: '#BDBDBD',
	},
	border: {
		light: '#E0E0E0', // Light border (neutral)
		dark: '#666876', // Dark border (darker gray)
	},
	common: {
		white: '#FFF',
		black: '#000',
		transparent: 'transparent',
		clear: 'rgba(0, 0, 0, 0)',
		mediumTransparent: 'rgba(0, 0, 0, 0.6)',
		lightTransparent: 'rgba(0, 0, 0, 0.8)',
		fullTransparent: 'rgba(0, 0, 0, 1)',
	},
	disabled: '#C5C5C5',
	background: {
		paper: '#FFF',
		main: '#C7C7C7',
	},
};
