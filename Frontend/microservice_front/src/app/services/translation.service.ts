import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Translation {
  text: string;
  language: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = `${environment.apiUrl}/translations`;

  constructor(private http: HttpClient) {}

  translateText(text: string, sourceLanguage: string, targetLanguage: string): Observable<Translation> {
    return this.http.post<Translation>(this.apiUrl, {
      text,
      sourceLanguage,
      targetLanguage
    });
  }

  getTranslations(text: string, sourceLanguage: string): Observable<Translation[]> {
    return this.http.get<Translation[]>(`${this.apiUrl}`, {
      params: {
        text,
        sourceLanguage
      }
    });
  }
} 