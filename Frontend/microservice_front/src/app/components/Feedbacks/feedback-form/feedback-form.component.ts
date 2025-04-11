import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { FeedbackService } from '../../../services/feedback.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  @Input() feedback: Feedback | null = null;
  @Input() isAnonymous: boolean = false;
  @Output() submit = new EventEmitter<Feedback>();
  @Output() cancel = new EventEmitter<void>();

  feedbackForm: FormGroup;
  loading = false;
  error: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', [Validators.required, Validators.minLength(3)]],
      comment: ['', [Validators.required, Validators.minLength(10)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    // Check if we're in edit mode
    if (this.route.snapshot.params['id']) {
      this.isEditMode = true;
      this.loadFeedback(this.route.snapshot.params['id']);
    } else if (this.feedback) {
      this.isEditMode = true;
      this.patchFormValues();
    }
  }

  loadFeedback(id: number): void {
    this.loading = true;
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback) => {
        this.feedback = feedback;
        this.patchFormValues();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load feedback';
        this.loading = false;
      }
    });
  }

  patchFormValues(): void {
    if (this.feedback) {
      this.feedbackForm.patchValue({
        name: this.feedback.name,
        role: this.feedback.role,
        comment: this.feedback.comment,
        rating: this.feedback.rating
      });
    }
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.loading = true;
      const formData = this.feedbackForm.value;

      const operation = this.isEditMode && this.feedback
        ? this.feedbackService.updateFeedback(this.feedback.id, formData)
        : this.feedbackService.createFeedback(formData);

      operation.subscribe({
        next: (result) => {
          this.submit.emit(result);
          this.router.navigate(['/feedbacks']);
          this.loading = false;
        },
        error: (err) => {
          this.error = this.isEditMode 
            ? 'Failed to update feedback' 
            : 'Failed to create feedback';
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    if (this.cancel.observed) {
      this.cancel.emit();
    } else {
      this.router.navigate(['/feedbacks']);
    }
  }
}