import * as path from 'path';
import * as dotenv from 'dotenv';

// Use CommonJS-style import for require
const currentDir = path.dirname(require.main?.filename || '');

dotenv.config({
  path: path.join(currentDir, '../.env'),
});

console.log('API_PORT:', process.env.API_PORT);
console.log('DB_HOST:', process.env.DB_HOST);

export const port = Number(process.env.API_PORT);
export const db_host = String(process.env.DB_HOST);
export const db_port = Number(process.env.DB_PORT);
export const db_name = String(process.env.DB_NAME);
export const db_user = String(process.env.DB_USER);
export const db_password = String(process.env.DB_PASSWORD);
export const validity = String(process.env.VALIDITY);
export const jwt_token = String(process.env.JWT_TOKEN);
export const encryption_algorithm = String(process.env.ENCRYPTION_ALGORITHM);
export const encryption_key = String(process.env.ENCRYPTION_KEY);
export const iv_length = String(process.env.IV_LENGTH);
