import { Controller, Inject, Get, Param, ParseIntPipe, Post, Body, Put, Delete } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { NotificationProtoInterface } from "src/interfaces/notifications";
import { NotificationsDTO_createNotification, NotificationsDTO_updateNotification } from "../dto/notifications.dto";

@Controller('notifications')
export class GatewayNotificationsController {
  private notificationGrpcService: NotificationProtoInterface;
  constructor(@Inject('NOTIFICATIONS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationGrpcService = this.client.getService<NotificationProtoInterface>('NotificationService');
  }

  @Get()
  async getAllTasks() {
    const result = await lastValueFrom(this.notificationGrpcService.GetNotifications({}));
    return result;
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await lastValueFrom(
        this.notificationGrpcService.GetNotification({ id: id }),
      );
      return result;
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Post()
  async createTask(@Body() data: NotificationsDTO_createNotification ) {
    try {
      const result = await lastValueFrom(this.notificationGrpcService.CreateNotification({notification: data}));
      return result;
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Put()
  async updateTask(@Body() data: NotificationsDTO_updateNotification) {
    try {
      await lastValueFrom(this.notificationGrpcService.UpdateNotification({notification: data}));
      return {
        message: `Notificação ${data.taskTitle} atualizada com sucesso!`,
      };
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    try {
      await lastValueFrom(this.notificationGrpcService.DeleteNotification({ id: id }));
      return { message: `Notificação de id ${id} removida com sucesso!` };
    } catch (_) {
      return { error: 'Erro durante a comunicação com o serviço' };
    }
  }
}