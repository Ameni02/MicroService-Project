// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { AnnonceCreateComponent } from './annonces/annonce-create/annonce-create.component';
import { AnnonceEditComponent } from './annonces/annonce-edit/annonce-edit.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { TrainingsComponent } from "./components/trainings/trainings.component";
import { EventsComponent } from "./components/events/events.component";
import { EvaluationComponent } from "./components/evaluation/evaluation.component";
import { FeedbackFormComponent } from "./components/Feedbacks/feedback-form/feedback-form.component";
import { FeedbackDetailComponent } from "./components/Feedbacks/feedback-detail/feedback-detail.component";
import { FeedbackListComponent } from "./components/Feedbacks/feedback-list/feedback-list.component";
import { AnonymousFeedbackComponent } from "./components/Feedbacks/anonymous-feedback/anonymous-feedback.component";
import { AdminDashboardComponent } from "./components/admin/admin-dashboard/admin-dashboard.component";
import { StatisticsDashboardComponent } from "./components/Feedbacks/statistics-dashboard/statistics-dashboard.component";
import { CategoryManagementComponent } from "./components/Feedbacks/category-management/category-management.component";
import { StatusBadgeComponent } from "./components/shared/status-badge/status-badge.component";
import { RatingStarsComponent } from "./components/shared/rating-stars/rating-stars.component";
import { FeedbackManagementComponent } from "./components/admin/feedback-management/feedback-management.component";
import { ForumComponent } from "./components/forum/forum.component";
import { ThreadListComponent } from "./components/forum/thread-list/thread-list.component";
import { ThreadDetailComponent } from "./components/forum/thread-detail/thread-detail.component";
import { ThreadFormComponent } from "./components/forum/thread-form/thread-form.component";
import { ReplyFormComponent } from "./components/forum/reply-form/reply-form.component";
import { ForumManagementComponent } from "./components/admin/forum-management/forum-management.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AnnonceManagementComponent } from './components/admin/annonce-management/annonce-management.component';
import {AuthInterceptor} from "./Security/auth.interceptor";
import { AnnonceDetailComponent } from './annonces/annonce-detail/annonce-detail.component';
import { AnnonceFrontComponent } from './annonces/annonce-front/annonce-front.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AnnonceCreateComponent,
    AnnonceEditComponent,
    UnauthorizedComponent,
    CategoryCreateComponent,
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
    AnnonceManagementComponent,
    AnnonceDetailComponent,
    AnnonceFrontComponent// Moved from imports to declarations
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminLayoutComponent, FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
