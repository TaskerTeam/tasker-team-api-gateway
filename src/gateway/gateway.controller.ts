import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Put,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { TaskDataInterface, TasksProtoInterface } from 'src/interfaces/protos';

@Controller('tasks')
export class GatewayTasksController {
  private taskGrpcService: TasksProtoInterface;
  constructor(@Inject('TASKS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskGrpcService = this.client.getService<TasksProtoInterface>('Tasks');
  }

  @Get()
  async getAllTasks() {
    const result = this.taskGrpcService.GetTasks({});
    const finalResult = await lastValueFrom(result);
    return finalResult;
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number) {
    try {
      const result = await lastValueFrom(
        this.taskGrpcService.GetTaskById({ taskId: id }),
      );
      return result;
    } catch (_) {
      return { error: 'Erro durante a execução' };
    }
  }

  @Post()
  async createTask(@Body() data: { task: TaskDataInterface }) {
    try {
      const result = await lastValueFrom(this.taskGrpcService.CreateTask(data));
      return result;
    } catch (_) {
      return { error: 'Erro durante a execução' };
    }
  }

  @Put()
  async updateTask(@Body() data: { task: TaskDataInterface }) {
    try {
      await lastValueFrom(this.taskGrpcService.UpdateTask(data));
      return {
        message: `Tarefa de id ${data.task.taskId} atualizada com sucesso!`,
      };
    } catch (_) {
      return { error: 'Erro durante a execução' };
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    try {
      await lastValueFrom(this.taskGrpcService.DeleteTask({ taskId: id }));
      return { message: `Tarefa de id ${id} removida com sucesso!` };
    } catch (_) {
      return { error: 'Erro durante a execução' };
    }
  }
}
