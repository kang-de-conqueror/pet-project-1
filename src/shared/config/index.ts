import {
  APP_API_KEY,
  APP_DESCRIPTION,
  APP_NAME,
  APP_SERVICE_NAME,
  APP_VERSION,
  DB_CHARSET,
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
  DEFAULT_ADMIN_USER_PASSWORD,
  DEFAULT_ADMIN_USER_USERNAME,
  ENVIRONMENT,
  GITHUB_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  JWT_ACCESS_TOKEN_EXP_IN_SEC,
  JWT_REFRESH_TOKEN_EXP_IN_SEC,
  JWT_SECRET,
  PORT,
} from './env';

export default (): any => ({
  env: ENVIRONMENT,
  port: PORT,
  app: {
    name: APP_NAME || '',
    description: APP_DESCRIPTION || '',
    version: APP_VERSION || 'v1',
    serviceName: APP_SERVICE_NAME || '',
  },

  database: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
    user: DB_USER,
    pass: DB_PASS,
    charset: DB_CHARSET,
  },
  jwt: {
    secret: JWT_SECRET,
    accessTokenExpiresInSec: JWT_ACCESS_TOKEN_EXP_IN_SEC,
    refreshTokenExpiresInSec: JWT_REFRESH_TOKEN_EXP_IN_SEC,
  },
  appApiKey: APP_API_KEY,
  defaultAdminUserPassword: DEFAULT_ADMIN_USER_PASSWORD,
  defaultAdminUserUsername: DEFAULT_ADMIN_USER_USERNAME,
  auth: {
    github: {
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
  },
});
