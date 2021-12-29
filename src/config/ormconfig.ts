import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_CONNECTION_URL,
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/database/migrations/*.js'],
  synchronize: true,
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/database/entities',
  },
};
export default config;
