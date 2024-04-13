import { Module } from '@nestjs/common';
// import { GatewayService } from './gateway.service';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GatewayTasksController } from './controllers/tasks.controller';
import { GatewayNotificationsController } from './controllers/notifications.controller';

//Conexão com microserviços
const grpcServicesConfig: ClientsModuleOptions = [
  {
    name: 'TASKS_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'tasks',
      protoPath: join(__dirname, 'proto/tasks.proto'),
    },
  },
  {
    name: 'NOTIFICATIONS_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5053',
      package: 'notification',
      protoPath: join(__dirname, 'proto/notifications.proto'),
    },
  },
]

@Module({
  imports: [ClientsModule.register(grpcServicesConfig)],
  controllers: [
    GatewayTasksController,
    GatewayNotificationsController
  ],
  providers: [],
})
export class GatewayModule {}
