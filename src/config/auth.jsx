export default {
    meEndpoint: `${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/me`,
    loginEndpoint: `${import.meta.env.VITE_REACT_APP_API_URL}/api/login`,
    registerEndpoint: `${import.meta.env.VITE_REACT_APP_API_URL}/api/users`,
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken' 
};
