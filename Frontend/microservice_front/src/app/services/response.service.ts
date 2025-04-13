import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  private apiUrl = `${environment.apiUrl}/responses`;

  constructor(private http: HttpClient) {}

  getResponsesByFeedbackId(feedbackId: number): Observable<Response[]> {
    return this.http.get<Response[]>(`${this.apiUrl}/feedback/${feedbackId}`);
  }

  getResponseById(id: string): Observable<Response> {
    return this.http.get<Response>(`${this.apiUrl}/${id}`);
  }

  createResponse(response: Response): Observable<Response> {
    return this.http.post<Response>(this.apiUrl, response);
  }

  updateResponse(id: number, response: Response): Observable<Response> {
    return this.http.put<Response>(`${this.apiUrl}/${id}`, response);
  }

  deleteResponse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 