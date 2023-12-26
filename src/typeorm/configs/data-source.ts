import { configDotenv } from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';

const T = __dirname + '/../../../.env';

configDotenv({ path: T });

const dataSource = new DataSource({
  type: process.env.DATABASE_TYPE as any,
  host: process.env.POSTGRES_HOST,
  port: parseInt(String(process.env.POSTGRES_PORT), 10),
  username: process.env.POSTGRES_USER,
  migrationsRun: false,
  ssl:
    process.env.ENV_TYPE === 'development'
      ? false
      : { rejectUnauthorized: false },
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_TYPE,
  entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../**/*-dy.ts')],
  synchronize: false,
});

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
