import { Feedback } from './feedback.model';

export interface Category {
    id?: number;
    name: string;
    description?: string;
    feedbacks?: Feedback[];
}
