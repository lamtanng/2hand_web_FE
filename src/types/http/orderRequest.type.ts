import { TaskType } from '../enum/taskType.type';

export interface NewRequestProps {
  name: string | undefined;
  status: string | undefined;
  orderStageID: string | undefined;
  description: string | undefined;
  taskType: TaskType;
  reasonID: string | undefined;
}

export interface ReplyRequestProps {
  _id: string | undefined;
  replyMessage: string | undefined;
  replyStatus: string;
}
