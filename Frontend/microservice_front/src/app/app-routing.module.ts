import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './pages/auth/signup/signup.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AnnonceEditComponent } from './annonces/annonce-edit/annonce-edit.component';
import { AnnonceCreateComponent } from './annonces/annonce-create/annonce-create.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

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
import { AuthGuard } from './guards/auth.guard';
import {AnnonceManagementComponent} from "./components/admin/annonce-management/annonce-management.component";
import {AnnonceFrontComponent} from "./annonces/annonce-front/annonce-front.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Public routes
  { path: 'trainings', component: TrainingsComponent },
  { path: 'feedbacks', component: FeedbackListComponent },

  // User-protected routes
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'annonces/front',
    component: AnnonceFrontComponent,
    canActivate: [AuthGuard],
    data: { roles: ['client_user', 'client_admin', 'user', 'admin'] }
  },
  {
    path: 'annonces/new',
    component: AnnonceCreateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['client_user', 'client_admin', 'user', 'admin'] }
  },
  {
    path: 'annonces/:id/edit',
    component: AnnonceEditComponent,
    canActivate: [AuthGuard] // optionnel
  }
,
  {
    path: 'feedbacks/create',
    component: FeedbackFormComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'feedbacks/:id',
    component: FeedbackDetailComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },
  {
    path: 'forum',
    component: ForumComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' }
  },

  // Admin-protected routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'feedbacks', component: FeedbackManagementComponent },
      { path: 'feedbacks/list', component: FeedbackListComponent },
      { path: 'feedbacks/archived', component: FeedbackListComponent },
      { path: 'feedbacks/categories', component: CategoryManagementComponent },
      { path: 'reports', component: StatisticsDashboardComponent },
      { path: 'forum', component: ForumManagementComponent },
      { path: 'annonces', component: AnnonceManagementComponent }
    ]
  },

  // Admin-specific routes outside layout
  {
    path: 'categories/new',
    component: CategoryCreateComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },
  {
    path: 'statistics',
    component: StatisticsDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' }
  },

  // Fallback route
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
