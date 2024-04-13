import { IsDate, IsInt, IsString } from "class-validator";

export class TasksDTO_createTask {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    date: string;
}

export class TasksDTO_updateTask {
    @IsInt()
    taskId: number
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    date: string;
}
