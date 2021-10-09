import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  entities: [join(__dirname + 'entity/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname + '/migration/**/*{.ts,.js}')],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
export = ormconfig;
