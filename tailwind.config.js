/** @type {import('tailwindcss').Config} */
import { COLORS } from "./src/constants/colors";

module.exports = {
	content: [
		"./App/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		"./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/app/screens/**/*.{js,jsx,ts,tsx}",
    "./src/app/routes/**/*.{js,jsx,ts,tsx}",
    "./src/app/routes/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				oxanium: ["Oxanium-Regular", "sans-serif"],
				"oxanium-bold": ["Oxanium-Bold", "sans-serif"],
				"oxanium-extrabold": ["Oxanium-ExtraBold", "sans-serif"],
				"oxanium-medium": ["Oxanium-Medium", "sans-serif"],
				"oxanium-semibold": ["Oxanium-SemiBold", "sans-serif"],
				"oxanium-light": ["Oxanium-Light", "sans-serif"],
				"oxanium-extralight": ["Oxanium-ExtraLight", "sans-serif"],
			},
			colors: {
				...COLORS,
			},
		},
	},
	plugins: [],
};
