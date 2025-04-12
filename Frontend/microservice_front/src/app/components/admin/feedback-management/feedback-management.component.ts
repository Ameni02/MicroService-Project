import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FeedbackService, FeedbackStats, Activity } from '../../../services/feedback.service';
import { Feedback } from '../../../models/feedback.model';
import { Category } from '../../../models/category.model';
import { Response } from '../../../models/response.model';
import { SearchParams, PagedResult } from '../../../services/feedback-search.service';
import { TranslationService, TranslationResult } from '../../../services/translation.service';

@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  activeTab: string = 'feedbacks';

  // Feedback management
  feedbacks: Feedback[] = [];
  archivedFeedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  feedbackLoading = false;
  feedbackError: string | null = null;
  showFeedbackDetail = false;
  feedbackResponses: Response[] = [];

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

  // Translation
  currentTranslation: TranslationResult | null = null;
  translationLoading = false;
  translationError: string | null = null;
  targetLanguage: string = 'en';

  // Category management
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  categoryLoading = false;
  categoryError: string | null = null;
  newCategory = { name: '', description: '' };

  // Response management
  responses: Response[] = [];
  responseLoading = false;
  responseError: string | null = null;

  // Statistics
  stats: FeedbackStats = {
    pending: 0,
    resolved: 0,
    total: 0,
    archived: 0,
    averageRating: 0
  };
  recentActivities: Activity[] = [];
  statsLoading = false;
  statsError: string | null = null;

  // Response form
  responseText: string = '';
  submittingResponse = false;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
    this.loadCategories();
    this.loadStats();
  }

  // Tab navigation
  setActiveTab(tab: string): void {
    this.activeTab = tab;

    // Load data based on active tab
    switch(tab) {
      case 'feedbacks':
        this.loadFeedbacks();
        break;
      case 'archived':
        this.loadArchivedFeedbacks();
        break;
      case 'categories':
        this.loadCategories();
        break;
      case 'reports':
        this.loadStats();
        break;
    }
  }

  // Feedback management methods
  loadFeedbacks(): void {
    this.feedbackLoading = true;
    this.feedbackError = null;

    // Use search if search term is provided, otherwise get all active feedbacks
    if (this.searchTerm) {
      this.searchFeedbacks();
    } else {
      this.feedbackService.getActiveFeedbacks().subscribe({
        next: (feedbacks) => {
          this.feedbacks = feedbacks;
          this.feedbackLoading = false;
        },
        error: (error: Error) => {
          this.feedbackError = 'Failed to load feedbacks';
          this.feedbackLoading = false;
          console.error('Error loading feedbacks:', error);
        }
      });
    }
  }

  searchFeedbacks(): void {
    this.feedbackLoading = true;
    this.feedbackError = null;

    // Update search params with current search term
    this.searchParams.searchTerm = this.searchTerm;
    this.searchParams.archived = false; // Only search active feedbacks

    this.feedbackService.searchFeedbacks(this.searchParams).subscribe({
      next: (result: PagedResult<Feedback>) => {
        this.feedbacks = result.content;
        this.totalElements = result.totalElements;
        this.totalPages = result.totalPages;
        this.currentPage = result.number;
        this.feedbackLoading = false;
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to search feedbacks';
        this.feedbackLoading = false;
        console.error('Error searching feedbacks:', error);
      }
    });
  }

  changePage(page: number): void {
    if (page < 0 || page >= this.totalPages) return;

    this.searchParams.page = page;
    this.searchFeedbacks();
  }

  updateFeedbackStatus(id: number, status: string): void {
    this.feedbackLoading = true;
    this.feedbackError = null;

    this.feedbackService.updateFeedbackStatus(id, status).subscribe({
      next: (updatedFeedback) => {
        // Update the feedback in the list
        const index = this.feedbacks.findIndex(f => f.id === id);
        if (index !== -1) {
          this.feedbacks[index] = updatedFeedback;
        }

        // If we're in detail view, update the selected feedback
        if (this.selectedFeedback && this.selectedFeedback.id === id) {
          this.selectedFeedback = updatedFeedback;
        }

        this.feedbackLoading = false;
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to update feedback status';
        this.feedbackLoading = false;
        console.error('Error updating feedback status:', error);
      }
    });
  }

  loadArchivedFeedbacks(): void {
    this.feedbackLoading = true;
    this.feedbackError = null;

    this.feedbackService.getArchivedFeedbacks().subscribe({
      next: (feedbacks) => {
        this.archivedFeedbacks = feedbacks;
        this.feedbackLoading = false;
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to load archived feedbacks';
        this.feedbackLoading = false;
        console.error('Error loading archived feedbacks:', error);
      }
    });
  }

  viewFeedbackDetail(id: number): void {
    this.feedbackLoading = true;
    this.feedbackError = null;
    this.showFeedbackDetail = true;
    this.currentTranslation = null;

    // Load the feedback details
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (feedback) => {
        this.selectedFeedback = feedback;

        // Load responses for this feedback
        this.loadFeedbackResponses(id);
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to load feedback details';
        this.feedbackLoading = false;
        console.error('Error loading feedback details:', error);
      }
    });
  }

  translateFeedback(): void {
    if (!this.selectedFeedback) return;

    this.translationLoading = true;
    this.translationError = null;

    this.translationService.translateText(this.selectedFeedback.comment, this.targetLanguage)
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

  loadFeedbackResponses(feedbackId: number): void {
    this.feedbackService.getResponsesForFeedback(feedbackId).subscribe({
      next: (responses) => {
        this.feedbackResponses = responses;
        this.feedbackLoading = false;
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to load responses';
        this.feedbackLoading = false;
        console.error('Error loading responses:', error);
      }
    });
  }

  closeFeedbackDetail(): void {
    this.showFeedbackDetail = false;
    this.selectedFeedback = null;
    this.feedbackResponses = [];
    this.responseText = '';
  }

  submitResponse(): void {
    if (!this.responseText.trim() || !this.selectedFeedback) return;

    this.submittingResponse = true;
    this.feedbackError = null;

    const response = {
      responseText: this.responseText
    };

    this.feedbackService.addResponse(this.selectedFeedback.id, response).subscribe({
      next: (newResponse) => {
        this.feedbackResponses.push(newResponse);
        this.responseText = '';
        this.submittingResponse = false;

        // Update the feedback status to 'In Progress' if it's 'Pending'
        if (this.selectedFeedback && this.selectedFeedback.status === 'Pending') {
          this.updateFeedbackStatus(this.selectedFeedback.id, 'In Progress');
        }
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to submit response';
        this.submittingResponse = false;
        console.error('Error submitting response:', error);
      }
    });
  }

  archiveFeedback(id: number): void {
    this.feedbackService.archiveFeedback(id).subscribe({
      next: () => {
        this.loadFeedbacks();
        this.loadArchivedFeedbacks();
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to archive feedback';
        console.error('Error archiving feedback:', error);
      }
    });
  }

  unarchiveFeedback(id: number): void {
    this.feedbackService.unarchiveFeedback(id).subscribe({
      next: () => {
        this.loadFeedbacks();
        this.loadArchivedFeedbacks();
      },
      error: (error: Error) => {
        this.feedbackError = 'Failed to unarchive feedback';
        console.error('Error unarchiving feedback:', error);
      }
    });
  }

  // Category management methods
  loadCategories(): void {
    this.categoryLoading = true;
    this.categoryError = null;

    this.feedbackService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryLoading = false;
      },
      error: (error: Error) => {
        this.categoryError = 'Failed to load categories';
        this.categoryLoading = false;
        console.error('Error loading categories:', error);
      }
    });
  }

  createCategory(): void {
    if (!this.newCategory.name) {
      this.categoryError = 'Category name is required';
      return;
    }

    this.categoryLoading = true;
    this.feedbackService.createCategory(this.newCategory).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.newCategory = { name: '', description: '' };
        this.categoryLoading = false;
      },
      error: (error: Error) => {
        this.categoryError = 'Failed to create category';
        this.categoryLoading = false;
        console.error('Error creating category:', error);
      }
    });
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.feedbackService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: (error: Error) => {
          this.categoryError = 'Failed to delete category';
          console.error('Error deleting category:', error);
        }
      });
    }
  }

  // Statistics methods
  loadStats(): void {
    this.statsLoading = true;
    this.statsError = null;

    // Get status counts
    this.feedbackService.getFeedbackCountByStatus().subscribe({
      next: (statusCounts) => {
        // Get average rating
        this.feedbackService.getAverageRating().subscribe({
          next: (averageRating) => {
            // Calculate stats
            this.stats = {
              pending: statusCounts['Pending'] || 0,
              resolved: statusCounts['Resolved'] || 0,
              total: Object.values(statusCounts).reduce((a, b) => a + b, 0),
              archived: 0, // Will be updated when archived feedbacks are loaded
              averageRating: averageRating,
              statusCounts: statusCounts
            };

            // Get archived feedbacks count
            this.feedbackService.getArchivedFeedbacks().subscribe({
              next: (archivedFeedbacks) => {
                this.stats.archived = archivedFeedbacks.length;
                this.statsLoading = false;
              },
              error: (error) => {
                this.statsError = 'Failed to load archived feedbacks';
                this.statsLoading = false;
                console.error('Error loading archived feedbacks:', error);
              }
            });
          },
          error: (error) => {
            this.statsError = 'Failed to load average rating';
            this.statsLoading = false;
            console.error('Error loading average rating:', error);
          }
        });
      },
      error: (error: Error) => {
        this.statsError = 'Failed to load status counts';
        this.statsLoading = false;
        console.error('Error loading status counts:', error);
      }
    });

    // Load recent activities
    this.feedbackService.getRecentActivities().subscribe({
      next: (activities) => {
        this.recentActivities = activities;
      },
      error: (error: Error) => {
        console.error('Error loading activities:', error);
      }
    });
  }

  // Helper methods for the reports tab
  getStatusKeys(): string[] {
    return this.stats.statusCounts ? Object.keys(this.stats.statusCounts) : [];
  }

  getStatusPercentage(status: string): number {
    if (!this.stats.statusCounts || !this.stats.total) return 0;
    const count = this.stats.statusCounts[status] || 0;
    return Math.round((count / this.stats.total) * 100);
  }

  getActivityIcon(type: string): string {
    switch(type.toLowerCase()) {
      case 'feedback':
        return 'bi-chat-dots';
      case 'user':
        return 'bi-person';
      case 'category':
        return 'bi-tag';
      case 'response':
        return 'bi-reply';
      default:
        return 'bi-circle';
    }
  }
}
