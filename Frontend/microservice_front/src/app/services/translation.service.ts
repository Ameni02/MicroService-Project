import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export interface TranslationResult {
  id?: number;
  originalText: string;
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  feedback?: any;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly apiUrl = 'http://localhost:8063/api/translations';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLanguage: string = 'en'): Observable<TranslationResult> {
    const params = { text, targetLanguage };
    return this.http.post<TranslationResult>(`${this.apiUrl}/translate`, null, { params }).pipe(
      catchError(this.handleError)
    );
  }

  detectLanguage(text: string): Observable<string> {
    const params = { text };
    return this.http.post<string>(`${this.apiUrl}/detect`, null, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Translation service error:', error);
    return throwError(() => new Error(error.message || 'Translation service error'));
  }
}