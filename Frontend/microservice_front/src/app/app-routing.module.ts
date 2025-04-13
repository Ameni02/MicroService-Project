import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from "./pages/auth/signup/signup.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { AnnonceEditComponent } from "./annonces/annonce-edit/annonce-edit.component";
import { AnnonceCreateComponent } from "./annonces/annonce-create/annonce-create.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { CategoryCreateComponent } from "./category/category-create/category-create.component";
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from './Security/JwtHelperService';

const authGuard = (requiredRole: 'user' | 'admin') => {
  return () => {
    const jwtHelper = inject(JwtHelperService);
    const router = inject(Router);

    if (!jwtHelper.isAuthenticated()) {
      router.navigate(['/login'], {
        queryParams: { returnUrl: router.url }
      });
      return false;
    }

    if (requiredRole === 'admin' && !jwtHelper.isAdmin()) {
      router.navigate(['/unauthorized'], {
        state: {
          message: 'Accès réservé aux administrateurs'
        }
      });
      return false;
    }

    if (requiredRole === 'user' && !jwtHelper.isUser()) {
      router.navigate(['/unauthorized'], {
        state: {
          message: 'Accès réservé aux utilisateurs'
        }
      });
      return false;
    }

    return true;
  };
};

const routes: Routes = [
  {
    path: 'annonce/new',
    component: AnnonceCreateComponent,
    canActivate: [authGuard('user')]
  },
  {
    path: 'categories/new',
    component: CategoryCreateComponent,
    canActivate: [authGuard('admin')]
  },
  {
    path: 'annonces/:id/edit',
    component: AnnonceEditComponent,
    canActivate: [authGuard('user')]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
