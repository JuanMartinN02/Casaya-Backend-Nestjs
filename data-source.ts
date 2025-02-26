import { Address } from './src/address/entities/address.entity';
import { Property } from './src/property/entities/property.entity';
import { User } from './src/user/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db',  
  port: 5432,
  username: 'user',  
  password: 'password',  
  database: 'realestate',  
  entities: [User, Property, Address],
  migrations: ['./src/migrations/*.ts'],
  synchronize: false,  
  logging: true,
});