import { Module } from '@nestjs/common';
// import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

//Conexão com microserviços
const grpcServicesConfig: ClientsModuleOptions = [
  {
    name: 'HELLOWORLD_PACKAGE',
    transport: Transport.GRPC,
    options: {
      url: 'localhost:50051',
      package: 'helloworld',
      protoPath: join(__dirname, 'proto/helloworld.proto'),
    },
  },
]

@Module({
  imports: [ClientsModule.register(grpcServicesConfig)],
  controllers: [
    GatewayController,
  ],
  providers: [],
})
export class GatewayModule {}
