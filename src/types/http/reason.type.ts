import { ObjectType } from '../enum/objectType.enum';
import { Role } from '../enum/role.enum';
import { TaskType } from '../enum/taskType.type';

export interface ReasonProps {
  _id: string;
  name: string;
  objectType: ObjectType;
  taskType: TaskType;
  role: Role;
  createAt?: Date;
  updateAt?: Date;
}
