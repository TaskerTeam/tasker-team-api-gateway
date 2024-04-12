import { Observable } from "rxjs";

export interface TaskDataInterface {
    taskId: number;
    title: string;
    description: string;
    date: string;
}

export interface TasksProtoInterface {
    GetTasks: ({}) => Observable<TaskDataInterface>
    CreateTask:  (data: {task: Omit<TaskDataInterface, "taskId">}) => Observable<TaskDataInterface>
    UpdateTask: (data: {task: TaskDataInterface}) => Observable<TaskDataInterface>
    DeleteTask: (data: {taskId: number}) => Observable<TaskDataInterface>
    GetTaskById: (data: {taskId: number}) => Observable<TaskDataInterface>
}