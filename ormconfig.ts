import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

const entity = []; // 여기에 entity를 넣어주세요
dotenv.config();
export const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  entities: entity,
  migrations: [join(__dirname + '/migration/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
  },
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
