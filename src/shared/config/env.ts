import * as dotenv from 'dotenv';

dotenv.config();

export const getEnv = (key: string) => {
  const value = process.env[key];
  return value || '';
};

// server
export const ENVIRONMENT = getEnv('NODE_ENV');
export const PRODUCTION = ENVIRONMENT === 'production';
export const DEVELOPMENT = ENVIRONMENT === 'development';
export const PORT = getEnv('APP_PORT')
  ? parseInt(getEnv('APP_PORT'), 10)
  : 3000;

// project
export const APP_NAME = getEnv('APP_NAME');
export const APP_DESCRIPTION = getEnv('APP_DESCRIPTION');
export const APP_VERSION = getEnv('APP_VERSION');
export const APP_SERVICE_NAME = getEnv('APP_SERVICE_NAME');

// Database
export const DB_HOST = getEnv('DB_HOST');
export const DB_PORT = getEnv('DB_PORT')
  ? parseInt(getEnv('DB_PORT'), 10)
  : undefined;
export const DB_NAME = getEnv('DB_NAME');
export const DB_USER = getEnv('DB_USER');
export const DB_PASS = getEnv('DB_PASS');
export const DB_CHARSET = getEnv('DB_CHARSET');

// swagger
export const SWAGGER_PATH = getEnv('SWAGGER_PATH');

// Auth
export const JWT_SECRET = getEnv('JWT_SECRET');
export const JWT_ACCESS_TOKEN_EXP_IN_SEC = getEnv('JWT_ACCESS_TOKEN_EXP_IN_SEC')
  ? parseInt(getEnv('JWT_ACCESS_TOKEN_EXP_IN_SEC'))
  : undefined;
export const JWT_REFRESH_TOKEN_EXP_IN_SEC = getEnv(
  'JWT_REFRESH_TOKEN_EXP_IN_SEC',
)
  ? parseInt(getEnv('JWT_REFRESH_TOKEN_EXP_IN_SEC'))
  : undefined;
export const APP_API_KEY = getEnv('APP_API_KEY');
export const DEFAULT_ADMIN_USER_PASSWORD = getEnv(
  'DEFAULT_ADMIN_USER_PASSWORD',
);
export const DEFAULT_ADMIN_USER_USERNAME = getEnv(
  'DEFAULT_ADMIN_USER_USERNAME',
);

export const GITHUB_CLIENT_ID = getEnv('GITHUB_OAUTH_CLIENT_ID');
export const GITHUB_CLIENT_SECRET = getEnv('GITHUB_OAUTH_CLIENT_SECRET');
export const GITHUB_CALLBACK_URL = getEnv('GITHUB_OAUTH_CALLBACK_URL');
