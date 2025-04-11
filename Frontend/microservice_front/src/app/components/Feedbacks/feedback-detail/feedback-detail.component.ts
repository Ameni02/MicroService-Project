import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { ResponseService } from '../../../services/response.service';
import { Feedback } from '../../../models/feedback.model';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  feedback: Feedback | null = null;
  loading = false;
  error: string | null = null;
  isArchiving = false;
  isUnarchiving = false;
  submitting = false;
  responseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feedbackService: FeedbackService,
    private responseService: ResponseService,
    private fb: FormBuilder
  ) {
    this.responseForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      author: ['Anonymous', [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && !isNaN(+id)) {
        this.loadFeedback(+id);
      } else {
        this.error = 'Invalid feedback ID';
        this.router.navigate(['/feedbacks']);
      }
    });
  }

  loadFeedback(id?: number): void {
    if (!id && this.feedback?.id) {
      id = this.feedback.id;
    }
    if (!id) return;
  
    this.loading = true;
    this.error = null;
    
    console.log('Loading feedback for ID:', id); // Debug log
    
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback: Feedback) => {
        console.log('Received feedback:', feedback); // Debug log
        
        // Ensure responses array exists
        if (!feedback.responses) {
          feedback.responses = [];
        }
        
        this.feedback = feedback;
        this.loading = false;
      },
      error: (err: Error) => {
        console.error('Error loading feedback:', err); // Detailed error log
        this.error = 'Failed to load feedback details';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.responseForm.invalid || !this.feedback) return;

    this.submitting = true;
    const newResponse: Partial<Response> = {
      content: this.responseForm.value.content,
      author: this.responseForm.value.author,
      feedbackId: this.feedback.id
    };

    this.responseService.createResponse(newResponse as Response).subscribe({
      next: (response: Response) => {
        if (!this.feedback) return;

        // Initialize responses array if it doesn't exist
        if (!this.feedback.responses) {
          this.feedback.responses = [];
        }

        // Update the feedback with the new response
        this.feedback = {
          ...this.feedback,
          responses: [...this.feedback.responses, response]
        };

        this.responseForm.reset({
          content: '',
          author: 'Anonymous'
        });
        this.submitting = false;
      },
      error: (err: Error) => {
        this.error = 'Failed to submit response. Please try again.';
        this.submitting = false;
        console.error('Error submitting response:', err);
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

  navigateToFeedbackList(): void {
    this.router.navigate(['/feedbacks']);
  }
}