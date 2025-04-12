export interface Reply {
    id?: number;
    content: string;
    author: string;
    threadId?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
