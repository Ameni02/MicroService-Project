import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

// Main Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { EventsComponent } from './components/events/events.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';

// Feedback Components
import { FeedbackListComponent } from './components/Feedbacks/feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './components/Feedbacks/feedback-detail/feedback-detail.component';
import { FeedbackFormComponent } from './components/Feedbacks/feedback-form/feedback-form.component';
import { AnonymousFeedbackComponent } from './components/Feedbacks/anonymous-feedback/anonymous-feedback.component';
import { StatisticsDashboardComponent } from './components/Feedbacks/statistics-dashboard/statistics-dashboard.component';
import { CategoryManagementComponent } from './components/Feedbacks/category-management/category-management.component';
import { ResponseFormComponent } from './components/Feedbacks/response-form/response-form.component';
import { TranslationViewComponent } from './components/Feedbacks/translation-view/translation-view.component';

const routes: Routes = [
  // Core Routes
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'trainings', component: TrainingsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'evaluation', component: EvaluationComponent },

  // Feedback Routes - Simplified structure
  { 
    path: 'feedbacks',
    component: FeedbackListComponent  // This handles the base /feedbacks route
  },
  { path: 'feedbacks/create', component: FeedbackFormComponent },
  { path: 'feedbacks/:id', component: FeedbackDetailComponent },
  { path: 'feedbacks/:id/edit', component: FeedbackFormComponent },
  { path: 'feedbacks/:id/responses/add', component: ResponseFormComponent },
  { path: 'feedbacks/:id/translate', component: TranslationViewComponent },

  // Special Feedback Routes
  { path: 'anonymous-feedback', component: AnonymousFeedbackComponent },
  { path: 'statistics', component: StatisticsDashboardComponent },
  { path: 'categories', component: CategoryManagementComponent },

  // Admin Routes
  { 
    path: 'admin',
    component: AdminDashboardComponent,
    // Add AuthGuard here to protect admin routes
    // canActivate: [AdminAuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      // Add more admin routes as needed
    ]
  },

  // Redirects
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  
  // 404 Handling (must be last)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,  // Set to true for debugging routing
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
