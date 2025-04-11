import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { EventsComponent } from './components/events/events.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Feedback Components
import { FeedbackListComponent } from './components/Feedbacks/feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './components/Feedbacks/feedback-detail/feedback-detail.component';
import { FeedbackFormComponent } from './components/Feedbacks/feedback-form/feedback-form.component';
import { AnonymousFeedbackComponent } from './components/Feedbacks/anonymous-feedback/anonymous-feedback.component';
import { StatisticsDashboardComponent } from './components/Feedbacks/statistics-dashboard/statistics-dashboard.component';
import { CategoryManagementComponent } from './components/Feedbacks/category-management/category-management.component';
import { ResponseListComponent } from './components/Feedbacks/response-list/response-list.component';
import { ResponseFormComponent } from './components/Feedbacks/response-form/response-form.component';
import { TranslationViewComponent } from './components/Feedbacks/translation-view/translation-view.component';

// Shared Components
import { StatusBadgeComponent } from './components/shared/status-badge/status-badge.component';
import { RatingStarsComponent } from './components/shared/rating-stars/rating-stars.component';

// Services
import { FeedbackService } from './services/feedback.service';
import { CategoryService } from './services/category.service';
import { ResponseService } from './services/response.service';
import { TranslationService } from './services/translation.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    TrainingsComponent,
    EventsComponent,
    EvaluationComponent,
    HeaderComponent,
    FooterComponent,
    FeedbackListComponent,
    FeedbackDetailComponent,
    FeedbackFormComponent,
    AnonymousFeedbackComponent,
    StatisticsDashboardComponent,
    CategoryManagementComponent,
    ResponseFormComponent,
    TranslationViewComponent,
    StatusBadgeComponent,
    RatingStarsComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [
    FeedbackService,
    CategoryService,
    ResponseService,
    TranslationService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
