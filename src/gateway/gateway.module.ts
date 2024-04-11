import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { TestGrpcController } from './test-grpc/test-grpc.controller';

@Module({
  controllers: [GatewayController, TestGrpcController],
  providers: [GatewayService],
})
export class GatewayModule {}
