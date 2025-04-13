import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../../services/feedback.service';

interface Statistics {
  totalFeedbacks: number;
  activeFeedbacks: number;
  archivedFeedbacks: number;
  averageRating: number;
  statusCounts: {
    [key: string]: number;
  };
}

@Component({
  selector: 'app-statistics-dashboard',
  templateUrl: './statistics-dashboard.component.html',
  styleUrls: ['./statistics-dashboard.component.css']
})
export class StatisticsDashboardComponent implements OnInit {
  statistics: Statistics = {
    totalFeedbacks: 0,
    activeFeedbacks: 0,
    archivedFeedbacks: 0,
    averageRating: 0,
    statusCounts: {}
  };
  loading = false;
  error: string | null = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  Object = Object;
  
  loadStatistics(): void {
    this.loading = true;
    this.error = null;

    this.feedbackService.getFeedbackCountByStatus().subscribe({
      next: (stats: Record<string, number>) => {
        this.statistics.statusCounts = stats;
      },
      error: (err: any) => {
        this.error = 'Failed to load statistics';
      }
    });
} }