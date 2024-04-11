import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //Swagger
  const config = new DocumentBuilder()
  .setTitle('Tasker Team - Api Gateway')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  //gRPC Server
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      package: 'task',
      protoPath: join(__dirname, 'gateway/proto/task.proto')
    }
  })
  await app.startAllMicroservices()

  //HTTP Server
  app.setGlobalPrefix('api')
  await app.listen(3001);
}
bootstrap();
