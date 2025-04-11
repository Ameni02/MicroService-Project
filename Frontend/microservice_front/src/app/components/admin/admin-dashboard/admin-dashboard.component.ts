import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeSection: string = 'overview';
  
  statistics = {
    users: {
      total: 1250,
      new: 48,
      active: 890
    },
    trainings: {
      total: 75,
      active: 45,
      draft: 30
    },
    events: {
      upcoming: 12,
      past: 24,
      total: 36
    },
    feedbacks: {
      pending: 15,
      resolved: 85,
      total: 100
    }
  };

  recentActivities = [
    {
      type: 'user',
      action: 'New registration',
      details: 'John Doe registered as a trainer',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      type: 'training',
      action: 'Course updated',
      details: 'Advanced Angular Development course content updated',
      timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      type: 'feedback',
      action: 'New feedback',
      details: 'Urgent feedback received for Cloud Computing course',
      timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Here you would typically make API calls to fetch real-time data
    // this.adminService.getDashboardStats().subscribe(...)
  }

  navigateToSection(section: string): void {
    this.activeSection = section;
  }

  handleQuickAction(action: string): void {
    switch(action) {
      case 'newTraining':
        this.router.navigate(['/admin/trainings/create']);
        break;
      case 'newEvent':
        this.router.navigate(['/admin/events/create']);
        break;
      case 'viewReports':
        this.router.navigate(['/admin/reports']);
        break;
      // Add more quick actions as needed
    }
  }
}