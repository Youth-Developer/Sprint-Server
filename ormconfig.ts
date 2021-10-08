import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  entities: [__dirname + 'entity/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migration/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
export = ormconfig;
