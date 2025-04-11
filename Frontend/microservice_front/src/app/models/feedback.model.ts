import { Response } from './response.model';

export interface Feedback {
    id: number;
    name: string;
    role: string;
    comment: string;
    rating: number;
    status: string;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId?: number;
    responses?: Response[];
}

export interface AnonymousFeedbackDTO {
    comment: string;
    rating: number;
    categoryId?: number;
} 