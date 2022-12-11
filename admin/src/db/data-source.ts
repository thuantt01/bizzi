import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  synchronize: false,
  entities: ['dist/app/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  url: 'postgresql://t.thuan:Th2%401294@localhost:5432/bizzi?schema=public',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
