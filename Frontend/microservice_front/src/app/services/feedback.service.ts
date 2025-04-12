import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap } from 'rxjs';
import { Feedback, AnonymousFeedbackDTO } from '../models/feedback.model';
import { Category } from '../models/category.model';
import { Response } from '../models/response.model';
import { PagedResult, SearchParams } from './feedback-search.service';
import { TranslationResult } from './translation.service';

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

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly apiUrl = 'http://localhost:8063/api/feedbacks';

  constructor(private http: HttpClient) {}

  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getResponsesForFeedback(feedbackId: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this.apiUrl}/${feedbackId}/responses`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }



  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getActiveFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/active`).pipe(
      catchError(this.handleError)
    );
  }

  createFeedback(feedback: any): Observable<Feedback> {
    console.log('Creating feedback with data:', feedback);

    // Ensure we have all required fields with proper types
    const feedbackData = {
      comment: feedback.comment || '',
      rating: Number(feedback.rating) || 0,
      isAnonymous: Boolean(feedback.isAnonymous) || false,
      status: feedback.status || 'Pending',
      archived: Boolean(feedback.archived) || false,
      categoryId: feedback.categoryId // Don't provide a default, let the backend validate
    };

    return this.http.post<Feedback>(this.apiUrl, feedbackData).pipe(
      catchError((error) => {
        console.error('Error creating feedback:', error);
        return this.handleError(error);
      })
    );
  }

  updateFeedback(id: number, feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback).pipe(
      catchError(this.handleError)
    );
  }

  updateFeedbackStatus(id: number, status: string): Observable<Feedback> {
    // Get the current feedback first, then update only the status
    return this.getFeedbackById(id).pipe(
      switchMap((feedback: Feedback) => {
        const updatedFeedback = { ...feedback, status };
        return this.http.put<Feedback>(`${this.apiUrl}/${id}`, updatedFeedback).pipe(
          catchError(this.handleError)
        );
      }),
      catchError(this.handleError)
    );
  }

  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Archive operations
  archiveFeedback(id: number): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/${id}/archive`, {}).pipe(
      catchError(this.handleError)
    );
  }

  unarchiveFeedback(id: number): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/${id}/unarchive`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getArchivedFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.apiUrl}/archived`).pipe(
      catchError(this.handleError)
    );
  }



  addResponse(feedbackId: number, responseData: { responseText: string }): Observable<Response> {
    // Create a simple response object with just the responseText
    return this.http.post<Response>(`${this.apiUrl}/${feedbackId}/responses`, responseData).pipe(
      catchError(this.handleError)
    );
  }

  deleteResponse(responseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/responses/${responseId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Category operations
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories`, category).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${categoryId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Statistics
  getFeedbackCountByStatus(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/stats/status-count`).pipe(
      catchError(this.handleError)
    );
  }

  getAverageRating(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/average-rating`).pipe(
      catchError(this.handleError)
    );
  }

  getFeedbackStats(): Observable<FeedbackStats> {
    // Create a custom implementation that combines multiple API calls
    return new Observable<FeedbackStats>(observer => {
      // First, get the status counts
      this.getFeedbackCountByStatus().subscribe({
        next: (statusCounts) => {
          // Then get the average rating
          this.getAverageRating().subscribe({
            next: (averageRating) => {
              // Calculate total from status counts
              const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

              // Get archived count
              this.getArchivedFeedbacks().subscribe({
                next: (archivedFeedbacks) => {
                  // Create the stats object
                  const stats: FeedbackStats = {
                    pending: statusCounts['Pending'] || 0,
                    resolved: statusCounts['Resolved'] || 0,
                    total: total,
                    archived: archivedFeedbacks.length,
                    averageRating: averageRating,
                    statusCounts: statusCounts
                  };

                  observer.next(stats);
                  observer.complete();
                },
                error: (error) => {
                  console.error('Error getting archived feedbacks:', error);
                  // Still return stats without archived count
                  const stats: FeedbackStats = {
                    pending: statusCounts['Pending'] || 0,
                    resolved: statusCounts['Resolved'] || 0,
                    total: total,
                    archived: 0,
                    averageRating: averageRating,
                    statusCounts: statusCounts
                  };

                  observer.next(stats);
                  observer.complete();
                }
              });
            },
            error: (error) => {
              console.error('Error getting average rating:', error);
              // Return stats without average rating
              const total = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);

              const stats: FeedbackStats = {
                pending: statusCounts['Pending'] || 0,
                resolved: statusCounts['Resolved'] || 0,
                total: total,
                archived: 0,
                averageRating: 0,
                statusCounts: statusCounts
              };

              observer.next(stats);
              observer.complete();
            }
          });
        },
        error: (error) => {
          console.error('Error getting status counts:', error);
          observer.error(error);
        }
      });
    });
  }

  getRecentActivities(): Observable<Activity[]> {
    // Since there's no activities endpoint, we'll create mock activities based on feedbacks
    return new Observable<Activity[]>(observer => {
      this.getAllFeedbacks().subscribe({
        next: (feedbacks) => {
          // Create activities from the most recent feedbacks
          const activities: Activity[] = feedbacks
            .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
            .slice(0, 5)
            .map(feedback => ({
              id: feedback.id,
              type: 'feedback',
              description: `New feedback received: ${feedback.comment.substring(0, 30)}...`,
              timestamp: new Date(feedback.submissionDate)
            }));
          observer.next(activities);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }

  // Anonymous feedback
  submitAnonymousFeedback(feedback: AnonymousFeedbackDTO): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/anonymous`, feedback).pipe(
      catchError(this.handleError)
    );
  }

  // Search and Translation methods
  searchFeedbacks(params: SearchParams): Observable<PagedResult<Feedback>> {
    let httpParams = new HttpParams();

    // Add all parameters that are defined
    if (params.searchTerm) httpParams = httpParams.set('searchTerm', params.searchTerm);
    if (params.minRating !== undefined) httpParams = httpParams.set('minRating', params.minRating.toString());
    if (params.maxRating !== undefined) httpParams = httpParams.set('maxRating', params.maxRating.toString());
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.archived !== undefined) httpParams = httpParams.set('archived', params.archived.toString());
    if (params.categoryId) httpParams = httpParams.set('categoryId', params.categoryId.toString());

    // Pagination and sorting
    httpParams = httpParams.set('page', (params.page || 0).toString());
    httpParams = httpParams.set('size', (params.size || 10).toString());
    httpParams = httpParams.set('sortBy', params.sortBy || 'submissionDate');
    httpParams = httpParams.set('sortDirection', params.sortDirection || 'desc');

    return this.http.get<PagedResult<Feedback>>(`${this.apiUrl}/search`, { params: httpParams }).pipe(
      catchError(this.handleError)
    );
  }

  getTranslation(feedbackId: number, targetLanguage: string = 'en'): Observable<TranslationResult> {
    return this.http.get<TranslationResult>(`${this.apiUrl}/${feedbackId}/translations/${targetLanguage}`).pipe(
      catchError(this.handleError)
    );
  }
}
