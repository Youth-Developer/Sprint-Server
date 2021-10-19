import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
import entities from './src/entities/index';

dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  entities: entities,
  migrations: [join(__dirname, '/migration/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
};

export default ormconfig;
