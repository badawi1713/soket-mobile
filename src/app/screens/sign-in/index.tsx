import type { AuthNavigationProp } from '@/app/routes';
import Logo from '@/assets/images/logo-pln-np-white.svg';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput'; // Import custom TextInput
import Typography from '@/components/Typography';
import images from '@/constants/images';
import type { ErrorResponse } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	type TextInput as RNTextInput,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { verticalScale } from 'react-native-size-matters';
import { z } from 'zod';

// Define validation schema with Zod
const loginSchema = z.object({
	username: z.string({ required_error: 'Username is required' }).min(1, { message: 'Username is required' }),
	password: z.string({ required_error: 'Password is required' }).min(1, { message: 'Password is required' }),
});

// Infer TypeScript types from the schema
type LoginFormData = z.infer<typeof loginSchema>;

const Screen = () => {
	const auth = useAuth();
	const navigation = useNavigation<AuthNavigationProp>();

	const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

	const usernameRef = useRef<RNTextInput>(null);
	const passwordRef = useRef<RNTextInput>(null);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});
	const onSubmit = async (data: LoginFormData) => {
		try {
			await auth.login(
				{ id: data.username, password: data.password, rememberMe: true, force: true },
				navigation,
				(error) => {
					const errorData = error.response?.data as ErrorResponse;
					console.log('error', errorData?.message);
					setError('username', {
						message: errorData?.message || 'Sorry, something went wrong. Try again later.',
					});

					// Prevent navigation or state updates here
					return false;
				},
			);
		} catch (error) {
			console.error('Error during login:', error);
			// Optionally show a toast or alert to the user
		}
	};

	return (
		<KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
			<ScrollView className="flex-1 bg-white relative">
				<Image
					style={{ height: verticalScale(290) }}
					source={images.imgLogin}
					className="w-full"
					resizeMode="stretch"
				/>
				<View className={clsx('absolute right-8', Platform.OS === 'ios' ? 'top-8' : 'top-0')}>
					<Logo width={100} height={80} />
				</View>
				{/* Username Field */}
				<View className="px-4 justify-end flex-1">
					<View className="mb-5">
						<Typography variant="header5">
							Welcome to
							<Typography variant="header5" className="text-primary-main">
								{' '}
								SOKET
							</Typography>
						</Typography>
						<Typography variant="body2" className="text-neutral-500">
							Input your username and password to continue
						</Typography>
					</View>
					<View style={styles.formContainer}>
						<Controller
							name="username"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									label="Username"
									placeholder="Enter your username"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									error={errors?.username?.message}
									inputRef={usernameRef} // Assign ref to TextInput
									returnKeyType="next"
									onSubmitEditing={() => passwordRef.current?.focus()} // Move to Password field
								/>
							)}
						/>

						{/* Password Field */}
						<Controller
							name="password"
							control={control}
							render={({ field: { onChange, value, onBlur } }) => (
								<TextInput
									label="Password"
									placeholder="Enter your password"
									value={value}
									onChangeText={onChange}
									onBlur={onBlur}
									error={errors?.password?.message}
									secureTextEntry={!showPassword}
									icon={showPassword ? 'eye-off' : 'eye'}
									iconPosition="right"
									onIconPress={() => setShowPassword(!showPassword)}
									inputRef={passwordRef} // Assign ref to TextInput
									returnKeyType="done"
									onSubmitEditing={handleSubmit(onSubmit)} // Submit form
								/>
							)}
						/>
					</View>

					{/* Submit Button */}
					<Button
						title={isSubmitting ? 'Loading' : 'Sign In'}
						disabled={isSubmitting}
						variant="contained"
						onPress={handleSubmit(onSubmit)}
						className="mb-2"
					/>
					<View />
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		height: verticalScale(240),
	},
});

export default Screen;
