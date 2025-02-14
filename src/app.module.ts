import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PropertyModule } from './property/property.module';
import { Property } from './property/entities/property.entity';
import { AddressModule } from './address/address.module';
import { Address } from './address/entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'AdminJuan',
      password: 'Admin0204',
      database: 'casaya_db',
      entities: [User, Property, Address],
      synchronize: true,
      
      /* Reinicia la BD */ 
      dropSchema: true,
    }),
    UserModule,
    PropertyModule,
    AddressModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
