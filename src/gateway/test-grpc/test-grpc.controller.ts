import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('grpc')
export class TestGrpcController {
    @GrpcMethod('TaskService', 'Create')
    create(data, metadata: Metadata, call: ServerUnaryCall<any, any>) {
        console.log(data)
        return {
            id: 1, ...data
        }
    }
}
