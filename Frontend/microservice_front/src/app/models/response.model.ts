import { Feedback } from './feedback.model';

export interface Response {
    id?: number;
    responseText: string;
    responseDate?: Date;
    feedback?: Feedback;
}
