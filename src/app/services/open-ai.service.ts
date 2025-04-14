// openai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface OpenAIResponse {
  message: string;
  suggestions?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getResponse(message: string): Observable<OpenAIResponse> {

    return this.http.post<any>(`${this.apiUrl}/chatbot/chat`, {message : message})
      .pipe(
        map(response => {
          console.log('OpenAI response:', response);
          const content = response.data
          return {
            message: content,
          };
        }),
        catchError(error => {
          console.error('Error calling OpenAI API:', error);
          return of({
            message: 'Sorry, I encountered an error processing your request. Please try again later.',
            suggestions: ['Try a different question', 'Contact support']
          });
        })
      );
  }
}