// ** React Imports
import { type ReactNode, createContext, useEffect, useState } from "react";

// ** Expo Router
import { usePathname, useRouter } from "expo-router";

// ** Axios
import axios, { type AxiosError } from "axios";

// ** Config
import SplashScreen from "@//components/SplashScreen";
import { SETTINGS } from "@//constants/settings"; // Adjust the path as needed
import { storage } from "@//utils/mmkv";

export interface ErrorResponse {
	message: string;
}

// ** Types
interface User {
	email: string;
	fullName: string;
	id: string;
	role: string;
	username: string;
}

interface AuthContextType {
	user: User | null;
	loading: boolean;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	login: (
		params: LoginParams,
		errorCallback?: (error: AxiosError) => void,
	) => Promise<void>;
	logout: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface LoginParams {
	id: string;
	password: string;
	rememberMe: boolean;
	force?: boolean;
}

const defaultProvider: AuthContextType = {
	user: null,
	loading: true,
	setUser: () => null,
	setLoading: () => {},
	login: async () => {},
	logout: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

const userData: User = {
	email: "admin@vuexy.com",
	fullName: "John Doe",
	id: "1",
	role: "admin",
	username: "johndoe",
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	// ** States
	const [user, setUser] = useState<User | null>(defaultProvider.user);
	const [loading, setLoading] = useState<boolean>(defaultProvider.loading);

	const router = useRouter();
	const pathname = usePathname();

	const handleUnauthorized = () => {
		setUser(null);
		storage.delete("userData");
		storage.delete(SETTINGS?.storageTokenKeyName);
		delete axios.defaults.headers.common.Authorization;

		// Only navigate if the user is currently on a protected route
		if (pathname !== "/") {
			router.replace("/");
		}
	};

	axios.interceptors.response.use(
		(response) => response,
		(error: AxiosError) => {
			if (error.response?.status === 401 && error.config) {
				handleUnauthorized();
			}
			return Promise.reject(error); // Reject the promise to let local error handling work
		},
	);

	useEffect(() => {
		setLoading(true);
		const initAuth = async () => {
			const storedToken = await secureStore.getItem(
				SETTINGS?.storageTokenKeyName,
			);
			if (storedToken) {
				await axios
					.get(SETTINGS?.meEndpoint, {
						headers: {
							Authorization: `Bearer ${storedToken}`,
						},
					})
					.then((response) => {
						setUser({ ...userData, ...response.data?.object });
						axios.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
						router.replace("/(protected)/home");
					})
					.catch((error: AxiosError) => {
						storage.delete("userData");
						storage.delete("refreshToken");
						storage.delete("accessToken");
						setUser(null);
						delete axios.defaults.headers.common.Authorization;
						if (
							error?.response?.status === 401 ||
							SETTINGS?.onTokenExpiration === "logout"
						) {
							alert("Error: Something went wrong.");
							router.replace("/");
						}
					})
					.finally(() => {
						setTimeout(() => setLoading(false), 1000);
					});
			} else {
				setTimeout(() => setLoading(false), 1000);
			}
		};
		initAuth();
	}, []);

	const handleLogin = async (
		params: LoginParams,
		errorCallback?: (error: AxiosError) => void,
	) => {
		try {
			const response = await axios.post(SETTINGS?.loginEndpoint, {
				username: params.id,
				password: params.password,
				via: "WEB",
				force: params.force,
			});

			if (params.rememberMe) {
				await storage.set(SETTINGS?.storageTokenKeyName, response.data.token);
				await storage.set("userData", JSON.stringify(response.data.user));
			}

			setUser(response.data.user);
			axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
			router.replace("/(protected)/home");
		} catch (err) {
			if (axios.isAxiosError(err)) {
				// const errorData = err.response?.data as ErrorResponse;
				// const message = errorData?.message || 'An unknown error occurred.';
				if (errorCallback) errorCallback(err);
			} else {
				console.error("Unexpected error:", err);
			}
		}
	};

	const handleLogout = async () => {
		const payload = {
			via: "WEB",
			userId: user?.id || "",
		};

		try {
			await axios.post(SETTINGS.logoutEndpoint, payload);

			if (!user?.id) {
				throw new Error("Cannot logout, no user ID found");
			} else {
				setUser(null);
				storage.delete("userData");
				storage.delete(SETTINGS?.storageTokenKeyName);
				delete axios.defaults.headers.common.Authorization;

				router.replace("/");
				alert("You have been logged out!");
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				// Use a type assertion to define the shape of the error response data
				const errorData = err.response?.data as ErrorResponse;
				const message = errorData?.message || "An unknown error occurred.";
				alert(`Error: ${message}`);
			} else {
				alert("Error: Something went wrong.");
			}
		}
	};

	const values: AuthContextType = {
		user,
		loading,
		setUser,
		setLoading,
		login: handleLogin,
		logout: handleLogout,
	};

	if (loading) {
		return <SplashScreen />;
	}

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
