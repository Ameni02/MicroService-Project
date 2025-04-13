import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService, FeedbackStats, Activity } from '../../../services/feedback.service';
import { ForumService } from '../../../services/forum.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'overview';

  statistics = {
    users: { total: 0, new: 0, active: 0 },
    trainings: { total: 0, active: 0, draft: 0 },
    events: { upcoming: 0, past: 0, total: 0 },
    feedbacks: { pending: 0, resolved: 0, total: 0, archived: 0 },
    forum: { threads: 0, replies: 0, locked: 0 }
  };

  recentActivities: Activity[] = [];

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private forumService: ForumService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.feedbackService.getFeedbackStats().subscribe({
      next: (stats: FeedbackStats) => {
        this.statistics.feedbacks = {
          pending: stats.pending,
          resolved: stats.resolved,
          total: stats.total,
          archived: stats.archived
        };
      },
      error: (error: Error) => {
        console.error('Error loading feedback stats:', error);
      }
    });

    this.feedbackService.getRecentActivities().subscribe({
      next: (activities: Activity[]) => {
        this.recentActivities = activities;
      },
      error: (error: Error) => {
        console.error('Error loading activities:', error);
      }
    });

    // Load forum statistics
    this.forumService.getAllThreads().subscribe({
      next: (threads) => {
        let repliesCount = 0;
        let lockedCount = 0;

        threads.forEach(thread => {
          if (thread.isLocked) lockedCount++;
          if (thread.replies) repliesCount += thread.replies.length;
        });

        this.statistics.forum = {
          threads: threads.length,
          replies: repliesCount,
          locked: lockedCount
        };
      },
      error: (error) => {
        console.error('Error loading forum stats:', error);
      }
    });
  }

  getActivityIcon(type: string): string {
    switch(type) {
      case 'user':
        return 'bi-person';
      case 'training':
        return 'bi-book';
      case 'feedback':
        return 'bi-chat';
      default:
        return 'bi-circle';
    }
  }

  navigateToSection(section: string): void {
    switch(section) {
      case 'feedbacks':
        this.router.navigate(['/admin/feedbacks']);
        break;
      case 'archived-feedbacks':
        this.router.navigate(['/admin/feedbacks']);
        this.activeSection = 'feedbacks';
        break;
      case 'categories':
        this.router.navigate(['/admin/feedbacks']);
        this.activeSection = 'feedbacks';
        break;
      case 'reports':
        this.router.navigate(['/admin/feedbacks']);
        this.activeSection = 'feedbacks';
        break;
      case 'forum':
        this.router.navigate(['/admin/forum']);
        break;
      default:
        this.activeSection = section;
    }
  }

  handleQuickAction(action: string): void {
    switch(action) {
      case 'viewFeedbacks':
        this.router.navigate(['/admin/feedbacks']);
        break;
      case 'viewReports':
        this.router.navigate(['/admin/feedbacks']);
        break;
      case 'manageCategories':
        this.router.navigate(['/admin/feedbacks']);
        break;
      case 'manageForum':
        this.router.navigate(['/admin/forum']);
        break;
    }
  }
}
