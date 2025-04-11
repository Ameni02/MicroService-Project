// anonymous-feedback.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { AnonymousFeedbackDTO } from '../../../models/feedback.model';

@Component({
  selector: 'app-anonymous-feedback',
  templateUrl: './anonymous-feedback.component.html',
  styleUrls: ['./anonymous-feedback.component.css']
})
export class AnonymousFeedbackComponent {
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  onCancel(): void {
    this.router.navigate(['/']);
  }

 // anonymous-feedback.component.ts
submitAnonymousFeedback(feedbackData: AnonymousFeedbackDTO): void {
  this.loading = true;
  this.feedbackService.submitAnonymousFeedback(feedbackData).subscribe({
    next: () => {
      this.success = true;
      setTimeout(() => this.router.navigate(['/']), 2000);
    },
    error: (err) => {
      this.error = 'Submission failed. Please try again.';
      this.loading = false;
    }
  });
}
}