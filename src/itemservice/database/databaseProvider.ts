import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST, // use environment variable or fallback to default value
        port: parseInt(process.env.DB_PORT, 10) || 3306, // parse environment variable as integer or fallback to default value
        username: process.env.DB_USERNAME, // use environment variable or fallback to default value
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE, // use environment variable or fallback to default value
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
