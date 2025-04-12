import { Reply } from './reply.model';

export interface Thread {
    id?: number;
    title: string;
    content: string;
    author: string;
    isLocked?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    replies?: Reply[];
}
