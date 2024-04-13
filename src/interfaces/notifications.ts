import { Observable } from "rxjs";

export interface NotificationDataInterface {
    id: number;
    taskTitle: string;
    typeMessage: number;
    message: string;
    date: string;
}

export interface NotificationProtoInterface {
    GetNotifications: ({}) => Observable<NotificationDataInterface>
    GetNotification: (data: {id: number}) => Observable<NotificationDataInterface>
    CreateNotification: (data: {notification: NotificationDataInterface}) => Observable<NotificationDataInterface>
    UpdateNotification: (data: {notification: Omit<NotificationDataInterface, "id">}) => Observable<NotificationDataInterface>
    DeleteNotification: (data: {id: number}) => Observable<NotificationDataInterface>
}