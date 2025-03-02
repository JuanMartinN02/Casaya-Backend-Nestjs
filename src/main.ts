import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',  
  });
  const port = process.env.PORT || 3000; // Railway asigna un puerto dinámico
  await app.listen(port);

  const config = new DocumentBuilder()
    .setTitle('Casaya API')
    .setDescription('API para la app de ventas inmobiliarias Casaya')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

}
bootstrap();
