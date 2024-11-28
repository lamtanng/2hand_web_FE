import { ObjectType } from "../enum/objectType.enum";
import { TaskType } from "../enum/taskType.type";

export interface ReasonProps{
    _id: string,
    name: string,
    objectType: ObjectType,
    taskType: TaskType,
    createAt?: Date,
    updateAt?: Date,
}