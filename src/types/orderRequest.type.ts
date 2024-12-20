import { ReplyStatus } from "./enum/replyStatus.enum";
import { TaskType } from "./enum/taskType.type";
import { ReasonProps } from "./http/reason.type";

export interface OrderRequestProps {
    _id: string;
    description: string;
    image?: string[];
    video?: string[];
    taskType: TaskType;
    replyStatus: ReplyStatus;
    replyMessage?: string;
    reasonID: ReasonProps;
    orderStageStatusID: string;
    createAt?: Date;
    updateAt?: Date;
  }