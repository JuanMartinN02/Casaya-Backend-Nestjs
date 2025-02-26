import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PropertyModule } from './property/property.module';
import { Property } from './property/entities/property.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "db",
      "port": 5432,
      "username": "user",
      "password": "password",
      "database": "realestate",
      "logging": true,
      entities: [User, Property],
      synchronize: true,
      
      /* Reinicia la BD */ 
      dropSchema: true,
    }),
    UserModule,
    PropertyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
