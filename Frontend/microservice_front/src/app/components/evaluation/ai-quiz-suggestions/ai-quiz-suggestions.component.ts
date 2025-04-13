import {Component, EventEmitter, Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ai-quiz-suggestions',
  standalone: false,
  templateUrl: './ai-quiz-suggestions.component.html',
  styleUrls: ['./ai-quiz-suggestions.component.css']
})
export class AiQuizSuggestionsComponent {
  topic: string = '';
  numQuestions: number = 5;
  aiQuiz: any = null;
  rawAiText: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private http: HttpClient) {}
  @Output() questionAdded = new EventEmitter<any>(); // ✅ Emit question data

  addToQuiz(question: any) {
    console.log('Adding question:', question);
    this.questionAdded.emit(question); // ✅ Send question to parent component
  }

  generateQuiz() {
    if (!this.topic.trim() || this.numQuestions < 1) {
      this.errorMessage = 'Please enter a valid topic and at least 1 question.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.aiQuiz = null;
    this.rawAiText = ''; // ✅ Reset raw response before API call

    this.http.post<any>('http://localhost:8080/generate', { topic: this.topic, numQuestions: this.numQuestions })
      .subscribe({
        next: (response) => {
          console.log('AI Response:', response);

          // ✅ Always store raw response (independent of parsing logic)
          this.rawAiText = JSON.stringify(response, null, 2);

          console.log("Raw AI Response (before display):", this.rawAiText);

          // ✅ If AI response contains structured quiz data, parse it
          if (response && response.quiz && Array.isArray(response.quiz.questions)) {
            this.aiQuiz = {
              title: response.quiz.title || response.quiz.name || "Generated Quiz",
              description: response.quiz.description || "AI-generated quiz",
              questions: response.quiz.questions
            };
          } else {
            this.aiQuiz = null; // ✅ Don't show structured view if parsing fails
          }

          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to generate quiz. Please try again.';
          console.error(error);
          this.loading = false;
        }
      });
  }

}
