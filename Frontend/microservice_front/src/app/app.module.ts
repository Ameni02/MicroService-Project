import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { EventsComponent } from './components/events/events.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { FeedbackFormComponent } from './components/Feedbacks/feedback-form/feedback-form.component';
import { FeedbackDetailComponent } from './components/Feedbacks/feedback-detail/feedback-detail.component';
import { FeedbackListComponent } from './components/Feedbacks/feedback-list/feedback-list.component';
import { AnonymousFeedbackComponent } from './components/Feedbacks/anonymous-feedback/anonymous-feedback.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { StatisticsDashboardComponent } from './components/Feedbacks/statistics-dashboard/statistics-dashboard.component';
import { CategoryManagementComponent } from './components/Feedbacks/category-management/category-management.component';
import { StatusBadgeComponent } from './components/shared/status-badge/status-badge.component';
import { RatingStarsComponent } from './components/shared/rating-stars/rating-stars.component';
import { FeedbackManagementComponent } from './components/admin/feedback-management/feedback-management.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TrainingsComponent,
    EventsComponent,
    EvaluationComponent,
    FeedbackFormComponent,
    FeedbackDetailComponent,
    FeedbackListComponent,
    AnonymousFeedbackComponent,
    AdminDashboardComponent,
    StatisticsDashboardComponent,
    CategoryManagementComponent,
    StatusBadgeComponent,
    RatingStarsComponent,
    FeedbackManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AdminLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
