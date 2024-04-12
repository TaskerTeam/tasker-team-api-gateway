import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { TasksProtoInterface } from 'src/interfaces/protos';
import { TasksDTO_createTask, TasksDTO_updateTask } from './dto/tasks.dto';

@Controller('tasks')
export class GatewayTasksController {
  private taskGrpcService: TasksProtoInterface;
  constructor(@Inject('TASKS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskGrpcService = this.client.getService<TasksProtoInterface>('Tasks');
  }

  @Get()
  async getAllTasks() {
    const result = await lastValueFrom(this.taskGrpcService.GetTasks({}));
    return result;
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await lastValueFrom(
        this.taskGrpcService.GetTaskById({ taskId: id }),
      );
      return result;
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Post()
  async createTask(@Body() data: TasksDTO_createTask ) {
    try {
      const result = await lastValueFrom(this.taskGrpcService.CreateTask({task: data}));
      return result;
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Put()
  async updateTask(@Body() data: TasksDTO_updateTask) {
    try {
      await lastValueFrom(this.taskGrpcService.UpdateTask({task: data}));
      return {
        message: `Tarefa de id ${data.taskId} atualizada com sucesso!`,
      };
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    try {
      await lastValueFrom(this.taskGrpcService.DeleteTask({ taskId: id }));
      return { message: `Tarefa de id ${id} removida com sucesso!` };
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }
}
