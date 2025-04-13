// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // 👈 Import ici

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AnnonceCreateComponent } from './annonces/annonce-create/annonce-create.component';
import { AnnonceEditComponent } from './annonces/annonce-edit/annonce-edit.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AnnonceCreateComponent,
    AnnonceEditComponent,
    UnauthorizedComponent,
    CategoryCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule // 👈 Et ici tu l’ajoutes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
