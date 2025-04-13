import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { ResponseService } from '../../../services/response.service';
import { TranslationService, TranslationResult } from '../../../services/translation.service';
import { Feedback } from '../../../models/feedback.model';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  feedback: Feedback | null = null;
  responses: Response[] = [];
  loading = false;
  error: string | null = null;
  isArchiving = false;
  isUnarchiving = false;
  responseForm: FormGroup;
  submitting = false;

  // Translation
  currentTranslation: TranslationResult | null = null;
  translationLoading = false;
  translationError: string | null = null;
  targetLanguage: string = 'en';

  constructor(
    private feedbackService: FeedbackService,
    private responseService: ResponseService,
    private translationService: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.responseForm = this.fb.group({
      responseText: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.loading = true;
    this.error = null;

    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.error = 'No feedback ID provided';
      this.loading = false;
      return;
    }

    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback) => {
        this.feedback = feedback;
        this.loadResponses(id);
      },
      error: (err) => {
        this.error = 'Failed to load feedback';
        this.loading = false;
        console.error('Error loading feedback:', err);
      }
    });
  }

  loadResponses(feedbackId: number): void {
    this.feedbackService.getResponsesForFeedback(feedbackId).subscribe({
      next: (responses) => {
        this.responses = responses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load responses';
        this.loading = false;
        console.error('Error loading responses:', err);
      }
    });
  }

  archiveFeedback(): void {
    if (!this.feedback) return;

    this.isArchiving = true;
    this.error = null;
    this.feedbackService.archiveFeedback(this.feedback.id).subscribe({
      next: () => {
        this.isArchiving = false;
        this.router.navigate(['/feedbacks'], {
          state: { message: 'Feedback archived successfully' }
        });
      },
      error: (err: Error) => {
        this.error = 'Failed to archive feedback';
        this.isArchiving = false;
        console.error('Error archiving feedback:', err);
      }
    });
  }

  unarchiveFeedback(): void {
    if (!this.feedback) return;

    this.isUnarchiving = true;
    this.error = null;
    this.feedbackService.unarchiveFeedback(this.feedback.id).subscribe({
      next: () => {
        this.isUnarchiving = false;
        this.router.navigate(['/feedbacks'], {
          state: { message: 'Feedback unarchived successfully' }
        });
      },
      error: (err: Error) => {
        this.error = 'Failed to unarchive feedback';
        this.isUnarchiving = false;
        console.error('Error unarchiving feedback:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.responseForm.invalid || !this.feedback) {
      // Mark fields as touched to show validation errors
      Object.keys(this.responseForm.controls).forEach(key => {
        const control = this.responseForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.error = null;

    const responseData = {
      responseText: this.responseForm.value.responseText,
      feedbackId: this.feedback.id
    };

    console.log('Submitting response:', responseData);

    try {
      this.feedbackService.addResponse(this.feedback.id, responseData).subscribe({
        next: (response) => {
          console.log('Response submitted successfully:', response);
          this.responses.push(response);
          this.responseForm.reset();
          this.submitting = false;

          // Update the feedback status to 'In Progress' if it's 'Pending'
          if (this.feedback && this.feedback.status === 'Pending') {
            this.feedbackService.updateFeedbackStatus(this.feedback.id, 'In Progress').subscribe({
              next: (updatedFeedback) => {
                this.feedback = updatedFeedback;
              },
              error: (err) => {
                console.error('Error updating feedback status:', err);
              }
            });
          }
        },
        error: (err) => {
          this.error = 'Failed to submit response';
          this.submitting = false;
          console.error('Error submitting response:', err);
        }
      });
    } catch (err) {
      console.error('Exception during response submission:', err);
      this.error = 'An unexpected error occurred';
      this.submitting = false;
    }
  }

  navigateToFeedbackList(): void {
    this.router.navigate(['/feedbacks']);
  }

  goBack(): void {
    this.router.navigate(['/feedbacks']);
  }

  translateFeedback(): void {
    if (!this.feedback) return;

    this.translationLoading = true;
    this.translationError = null;

    this.translationService.translateText(this.feedback.comment, this.targetLanguage)
      .subscribe({
        next: (result) => {
          this.currentTranslation = result;
          this.translationLoading = false;
        },
        error: (error) => {
          this.translationError = 'Failed to translate feedback';
          this.translationLoading = false;
          console.error('Error translating feedback:', error);
        }
      });
  }
}
