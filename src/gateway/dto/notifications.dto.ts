import { IsDate, IsInt, IsString } from "class-validator";

export class NotificationsDTO_createNotification {
    @IsInt()
    id: number;

    @IsString()
    taskTitle: string;

    @IsInt()
    typeMessage: number;

    @IsString()
    message: string;

    @IsString()
    date: string;
}

export class NotificationsDTO_updateNotification {
    @IsString()
    taskTitle: string;

    @IsInt()
    typeMessage: number;

    @IsString()
    message: string;
    
    @IsString()
    date: string;
}