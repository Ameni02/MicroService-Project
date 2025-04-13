import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../services/feedback.service';
import { Feedback, AnonymousFeedbackDTO } from '../../../models/feedback.model';
import { SearchParams, PagedResult } from '../../../services/feedback-search.service';
import { Category } from '../../../models/category.model';

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
    categoryId: null
  };
  formSubmitted = false;

  // Search functionality
  searchParams: SearchParams = {
    page: 0,
    size: 10,
    sortBy: 'submissionDate',
    sortDirection: 'desc'
  };
  searchTerm: string = '';
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;

  // Filter options
  categories: Category[] = [];
  statusOptions = ['Pending', 'In Progress', 'Resolved'];
  ratingOptions = [1, 2, 3, 4, 5];
  showFilters = false;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
    this.loadCategories();
  }

  // Make sure anonymous feedback validation checks for category
  submitAnonymousFeedback(): void {
    this.formSubmitted = true;

    if (!this.anonymousFeedbackData.comment || this.anonymousFeedbackData.rating <= 0 || !this.anonymousFeedbackData.categoryId) {
      // Form validation will show errors via the template
      return;
    }

    this.loading = true;
    this.error = null;

    this.feedbackService.submitAnonymousFeedback(this.anonymousFeedbackData).subscribe({
      next: (feedback: Feedback) => {
        this.showAnonymousForm = false;
        this.anonymousFeedbackData = { comment: '', rating: 0, categoryId: null };
        this.formSubmitted = false;
        this.loadFeedbacks();
      },
      error: (err: Error) => {
        this.error = 'Failed to submit anonymous feedback';
        this.loading = false;
        console.error('Error submitting anonymous feedback:', err);
      }
    });
  }

  loadCategories(): void {
    this.feedbackService.getAllCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      },
      error: (err: Error) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.error = null;

    // Use search if search term is provided, otherwise get all active feedbacks
    if (this.searchTerm) {
      this.searchFeedbacks();
    } else {
      this.feedbackService.getActiveFeedbacks().subscribe({
        next: (feedbacks: Feedback[]) => {
          this.activeFeedbacks = feedbacks;
          this.loading = false;
        },
        error: (err: Error) => {
          this.error = 'Failed to load feedbacks. Please try again later.';
          this.loading = false;
          console.error('Error loading feedbacks:', err);
        }
      });
    }
  }

  searchFeedbacks(): void {
    this.loading = true;
    this.error = null;

    // Update search params with current search term
    this.searchParams.searchTerm = this.searchTerm;
    this.searchParams.archived = false; // Only search active feedbacks

    console.log('Searching with params:', this.searchParams);

    this.feedbackService.searchFeedbacks(this.searchParams).subscribe({
      next: (result: PagedResult<Feedback>) => {
        this.activeFeedbacks = result.content;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
        this.currentPage = result.number;
        this.loading = false;
      },
      error: (error: Error) => {
        this.error = 'Failed to search feedbacks';
        this.loading = false;
        console.error('Error searching feedbacks:', error);
      }
    });
  }

  resetFilters(): void {
    this.searchParams = {
      page: 0,
      size: 10,
      sortBy: 'submissionDate',
      sortDirection: 'desc',
      searchTerm: this.searchTerm,
      archived: false
    };
    this.searchFeedbacks();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;

    this.searchParams.page = page;
    this.searchFeedbacks();
  }

  createFeedback(): void {
    this.router.navigate(['/feedbacks/create']);
  }

  // This function has been moved up in the file

  viewFeedback(feedbackId: number | undefined): void {
    if (feedbackId) {
      this.router.navigate(['/feedbacks', feedbackId]);
    }
  }

  cancelAnonymousFeedback(): void {
    this.showAnonymousForm = false;
    this.anonymousFeedbackData = { comment: '', rating: 0, categoryId: null };
    this.formSubmitted = false;
    this.error = null;
  }
}
