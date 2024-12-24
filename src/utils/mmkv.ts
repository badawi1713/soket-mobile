import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const setStringValue = (key: string, value: string) => {
	storage.set(key, value);
};

export const getStringValue = (key: string): string | null => {
	return storage.getString(key) ?? null;
};

export const setObjectValue = <T>(key: string, value: T) => {
	storage.set(key, JSON.stringify(value));
};

export const getObjectValue = <T>(key: string): T | null => {
	const jsonValue = storage.getString(key);
	return jsonValue ? JSON.parse(jsonValue) : null;
};

export const removeValue = (key: string) => {
	storage.delete(key);
};
