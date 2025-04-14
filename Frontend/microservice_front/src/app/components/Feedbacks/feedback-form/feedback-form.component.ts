import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { Category } from '../../../models/category.model';
import { FeedbackService } from '../../../Services_groupe/feedback.service';
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
  categories: Category[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.feedbackForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      categoryId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Load categories first
    this.loadCategories();

    // Check if we're in edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'create') {
      this.isEditMode = true;
      this.loadFeedback(Number(id));
    } else if (this.feedback) {
      this.isEditMode = true;
      this.patchFormValues();
    } else {
      // We're in create mode, nothing to load
      console.log('Creating new feedback');
    }
  }

  loadCategories(): void {
    this.loading = true;
    this.feedbackService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        this.loading = false;

        // If there are categories, select the first one by default
        if (categories.length > 0 && !this.feedbackForm.get('categoryId')?.value) {
          this.feedbackForm.patchValue({ categoryId: categories[0].id });
        }
      },
      error: (err: Error) => {
        console.error('Error loading categories:', err);
        this.loading = false;
      }
    });
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
        comment: this.feedback.comment,
        rating: this.feedback.rating,
        categoryId: this.feedback.category?.id || null
      });
    }
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.loading = true;
      this.error = null;

      // Create a complete feedback object with all required fields
      const formData = {
        comment: this.feedbackForm.value.comment,
        rating: this.feedbackForm.value.rating,
        isAnonymous: this.isAnonymous || false,
        status: 'Pending',
        archived: false,
        categoryId: this.feedbackForm.value.categoryId
      };

      console.log('Submitting feedback:', formData);

      // Use a try-catch block to handle any errors
      try {
        const operation = this.isEditMode && this.feedback?.id
          ? this.feedbackService.updateFeedback(this.feedback.id, formData)
          : this.feedbackService.createFeedback(formData);

        operation.subscribe({
          next: (result) => {
            console.log('Feedback submitted successfully:', result);
            this.submit.emit(result);
            this.router.navigate(['/feedbacks']);
            this.loading = false;
          },
          error: (err) => {
            console.error('Error submitting feedback:', err);
            this.error = this.isEditMode
              ? 'Failed to update feedback'
              : 'Failed to create feedback';
            this.loading = false;
          }
        });
      } catch (err) {
        console.error('Exception during feedback submission:', err);
        this.error = 'An unexpected error occurred';
        this.loading = false;
      }
    } else {
      // Form is invalid, mark all fields as touched to show validation errors
      Object.keys(this.feedbackForm.controls).forEach(key => {
        const control = this.feedbackForm.get(key);
        control?.markAsTouched();
      });
      this.error = 'Please fix the errors in the form';
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
