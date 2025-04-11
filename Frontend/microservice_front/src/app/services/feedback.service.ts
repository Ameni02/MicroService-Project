import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Feedback, AnonymousFeedbackDTO} from '../models/feedback.model';
import { Category } from '../models/category.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly apiUrl = 'http://localhost:8063/api/feedbacks';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Feedback operations
  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
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

  createFeedback(feedback: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt'>): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, feedback).pipe(
      catchError(this.handleError)
    );
  }

  updateFeedback(id: number, feedback: Partial<Feedback>): Observable<Feedback> {
    return this.http.put<Feedback>(`${this.apiUrl}/${id}`, feedback).pipe(
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

  // Response operations
  getResponsesForFeedback(feedbackId: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this.apiUrl}/${feedbackId}/responses`).pipe(
      catchError(this.handleError)
    );
  }

  addResponse(feedbackId: number, response: Omit<Response, 'id' | 'createdAt' | 'updatedAt'>): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/${feedbackId}/responses`, response).pipe(
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

  // Anonymous feedback
  submitAnonymousFeedback(feedback: AnonymousFeedbackDTO): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/anonymous`, feedback).pipe(
      catchError(this.handleError)
    );
  }
}