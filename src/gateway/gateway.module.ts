import { Module } from '@nestjs/common';
// import { GatewayService } from './gateway.service';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GatewayTasksController } from './gateway.controller';

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
]

@Module({
  imports: [ClientsModule.register(grpcServicesConfig)],
  controllers: [
    GatewayTasksController,
  ],
  providers: [],
})
export class GatewayModule {}
