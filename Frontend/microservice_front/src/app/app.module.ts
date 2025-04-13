import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
// @ts-ignore
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

// Forum Components
import { ForumComponent } from './components/forum/forum.component';
import { ThreadListComponent } from './components/forum/thread-list/thread-list.component';
import { ThreadDetailComponent } from './components/forum/thread-detail/thread-detail.component';
import { ThreadFormComponent } from './components/forum/thread-form/thread-form.component';
import { ReplyFormComponent } from './components/forum/reply-form/reply-form.component';
import { ForumManagementComponent } from './components/admin/forum-management/forum-management.component';
import { AddQuizComponent } from './components/evaluation/add-quiz/add-quiz.component';
import { QuizListComponent } from './components/events/quiz-list/quiz-list.component';
import { QuizDetailsComponent } from './components/evaluation/quiz-details/quiz-details.component';
import { TakeQuizComponent } from './components/evaluation/take-quiz/take-quiz.component';
import { QuizListWitoutQuestionsComponent } from './components/evaluation/quiz-list-witout-questions/quiz-list-witout-questions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AiQuizSuggestionsComponent} from './components/evaluation/ai-quiz-suggestions/ai-quiz-suggestions.component';

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
    FeedbackManagementComponent,
    // Forum Components
    ForumComponent,
    ThreadListComponent,
    ThreadDetailComponent,
    ThreadFormComponent,
    ReplyFormComponent,
    ForumManagementComponent,
    AddQuizComponent,
    QuizListComponent,
    QuizDetailsComponent,
    TakeQuizComponent,
    QuizListWitoutQuestionsComponent,
    AiQuizSuggestionsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AdminLayoutComponent,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatStepperModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
