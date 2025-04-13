import { Feedback } from './feedback.model';

export interface TranslationResult {
    id?: number;
    originalText: string;
    translatedText: string;
    sourceLanguage: string;
    targetLanguage: string;
    feedback?: Feedback;
}