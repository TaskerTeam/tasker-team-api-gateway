import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';

import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';


interface TaskGrpcService {
  SayHello(data: {name: string}): Observable<any>
}

@Controller('task')
export class GatewayController {
  private taskGrpcService: TaskGrpcService;
  constructor(@Inject('HELLOWORLD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskGrpcService = this.client.getService<TaskGrpcService>('Greeter')
  }

  @Post()
  async create(@Body() data) {
    const result = this.taskGrpcService.SayHello({name: 'teste'})
    const finalResult = await lastValueFrom(result)
    console.log(finalResult)
    return 'Veja o console'
  }
}
