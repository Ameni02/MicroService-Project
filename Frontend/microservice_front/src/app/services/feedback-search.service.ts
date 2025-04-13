import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Feedback } from '../models/feedback.model';

export interface SearchParams {
  searchTerm?: string;
  minRating?: number;
  maxRating?: number;
  status?: string;
  archived?: boolean;
  categoryId?: number;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface PagedResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackSearchService {
  private readonly apiUrl = 'http://localhost:8063/api/feedbacks/search';

  constructor(private http: HttpClient) {}

  advancedSearch(params: SearchParams): Observable<PagedResult<Feedback>> {
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

    return this.http.get<PagedResult<Feedback>>(this.apiUrl, { params: httpParams }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Search service error:', error);
    return throwError(() => new Error(error.message || 'Search service error'));
  }
}
