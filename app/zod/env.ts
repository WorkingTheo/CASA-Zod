import { z } from 'zod';
import development from './development.json';
import production from './production.json';
import test from './test.json';

interface Config {
  MESSAGE: string;
  SERVER_PORT: number,
  CASA_MOUNT_URL: string,
  SESSION_ID: string,
  SESSIONS_SECRET: string,
  SESSIONS_TTL_SECONDS: number,
  SECURE_COOKIES: boolean
}

const envSchema = z.object({
  MESSAGE: z.string(),
  SERVER_PORT: z.number(),
  CASA_MOUNT_URL: z.string(),
  SESSION_ID: z.string(),
  SESSIONS_SECRET: z.string(),
  SESSIONS_TTL_SECONDS: z.number(),
  SECURE_COOKIES: z.boolean()
});

let env: Config;
if(process.env.NODE_ENV === 'production') {
  env = envSchema.parse(production) as Config;
} else if(process.env.NODE_ENV === 'test') {
  env = envSchema.parse(test) as Config;
} else if(process.env.NODE_ENV === 'development') {
  env = envSchema.parse(development) as Config;
}

export default env;
