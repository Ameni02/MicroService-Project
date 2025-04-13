import { Category } from './category.model';
import { TranslationResult } from '../services/translation.service';

export interface Feedback {
    id: number;
    comment: string;
    isAnonymous: boolean;
    rating: number;
    submissionDate: Date;
    status: string;
    category: Category;
    archived: boolean;
    translations?: TranslationResult[];
}

export interface AnonymousFeedbackDTO {
    comment: string;
    rating: number;
    categoryId: number | null;
}

export interface FeedbackStats {
    pending: number;
    resolved: number;
    total: number;
    archived: number;
    totalFeedbacks?: number;
    averageRating?: number;
    statusCounts?: { [key: string]: number };
}

export interface Activity {
    id: number;
    type: string;
    description: string;
    timestamp: Date;
}
