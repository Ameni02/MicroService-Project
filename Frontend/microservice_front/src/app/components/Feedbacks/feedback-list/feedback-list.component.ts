import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback, AnonymousFeedbackDTO } from '../../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  activeFeedbacks: Feedback[] = [];
  loading = false;
  error: string | null = null;
  showAnonymousForm = false;
  anonymousFeedbackData: AnonymousFeedbackDTO = {
    comment: '',
    rating: 0,
    categoryId: undefined
  };

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.error = null;
    this.feedbackService.getActiveFeedbacks().subscribe({
      next: (feedbacks) => {
        this.activeFeedbacks = feedbacks;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load feedbacks. Please try again later.';
        this.loading = false;
        console.error('Error loading feedbacks:', err);
      }
    });
  }

  createFeedback(): void {
    this.router.navigate(['/feedbacks/create']);
  }

  submitAnonymousFeedback(): void {
    if (!this.anonymousFeedbackData.comment || this.anonymousFeedbackData.rating <= 0) {
      this.error = 'Please provide both comment and rating';
      return;
    }

    this.loading = true;
    this.error = null;
    
    this.feedbackService.submitAnonymousFeedback(this.anonymousFeedbackData).subscribe({
      next: () => {
        this.showAnonymousForm = false;
        this.anonymousFeedbackData = { comment: '', rating: 0, categoryId: undefined };
        this.loadFeedbacks();
      },
      error: (err) => {
        this.error = 'Failed to submit anonymous feedback';
        this.loading = false;
        console.error('Error submitting anonymous feedback:', err);
      }
    });
  }

  viewFeedback(id: number): void {
    this.router.navigate(['/feedbacks', id]);
  }

  cancelAnonymousFeedback(): void {
    this.showAnonymousForm = false;
    this.anonymousFeedbackData = { comment: '', rating: 0, categoryId: undefined };
  }
}