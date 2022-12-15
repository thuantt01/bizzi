import { DataSource, DataSourceOptions } from 'typeorm';

import 'dotenv/config';

export const dataSourceOptions: DataSourceOptions = {
  logging: true,
  type: 'postgres',
  synchronize: false,
  url: process.env.DATABASE_URL,
  entities: ['dist/app/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
