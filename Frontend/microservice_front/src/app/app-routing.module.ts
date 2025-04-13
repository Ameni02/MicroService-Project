import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { FeedbackListComponent } from './components/Feedbacks/feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './components/Feedbacks/feedback-detail/feedback-detail.component';
import { FeedbackFormComponent } from './components/Feedbacks/feedback-form/feedback-form.component';
import { StatisticsDashboardComponent } from './components/Feedbacks/statistics-dashboard/statistics-dashboard.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { CategoryManagementComponent } from './components/Feedbacks/category-management/category-management.component';
import { FeedbackManagementComponent } from './components/admin/feedback-management/feedback-management.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ForumComponent } from './components/forum/forum.component';
import { ForumManagementComponent } from './components/admin/forum-management/forum-management.component';
import {TakeQuizComponent} from "./components/evaluation/take-quiz/take-quiz.component";
import {QuizListComponent} from "./components/events/quiz-list/quiz-list.component";
import {QuizDetailsComponent} from "./components/evaluation/quiz-details/quiz-details.component";
import {
  QuizListWitoutQuestionsComponent
} from "./components/evaluation/quiz-list-witout-questions/quiz-list-witout-questions.component";
import {AddQuizComponent} from "./components/evaluation/add-quiz/add-quiz.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trainings', component: TrainingsComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'feedbacks', component: FeedbackManagementComponent },
      { path: 'feedbacks/list', component: FeedbackListComponent },
      { path: 'feedbacks/archived', component: FeedbackListComponent },
      { path: 'feedbacks/categories', component: CategoryManagementComponent },
      { path: 'reports', component: StatisticsDashboardComponent },
      { path: 'forum', component: ForumManagementComponent }
    ]
  },
  { path: 'feedbacks', component: FeedbackListComponent },
  { path: 'feedbacks/create', component: FeedbackFormComponent },
  { path: 'feedbacks/:id', component: FeedbackDetailComponent },
  { path: 'statistics', component: StatisticsDashboardComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'add-quiz', component: AddQuizComponent },
  {path: 'quiz-list', component: QuizListWitoutQuestionsComponent },
  { path: 'quiz-details/:id', component: QuizDetailsComponent },
  { path: 'quizzes', component: QuizListComponent },
  { path: 'take-quiz/:id', component: TakeQuizComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
