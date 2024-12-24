import packageJson from '@/package.json';

export const SETTINGS = {
	appName: 'SOKET',
	version: packageJson.version,
	meEndpoint: '/service/identity/validate/access-token',
	loginEndpoint: '/service/identity/auth',
	registerEndpoint: '/jwt/register',
	storageTokenKeyName: 'accessToken',
	onTokenExpiration: 'refreshToken', // logout | refreshToken
	logoutEndpoint: '/service/identity/user/logout'
};
