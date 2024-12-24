import type { AuthNavigationProp } from '@/app/routes';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

const Screen = () => {
	const { logout } = useAuth();
	const navigation = useNavigation<AuthNavigationProp>();

	return (
		<View className="flex-1 justify-center items-center px-4">
			<Button
				variant="contained"
				icon="log-out"
				className="w-full"
				onPress={() => logout(navigation)}
				title="Sign Out"
			/>
		</View>
	);
};

export default Screen;
