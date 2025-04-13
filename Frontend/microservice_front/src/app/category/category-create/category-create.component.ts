import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services_annonces/services';
import { Router } from '@angular/router';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    console.log('User roles:', this.jwtHelper.getUserRoles());

    if (!this.jwtHelper.isAdmin()) {
      this.errorMessage = 'Seuls les administrateurs peuvent créer des catégories';
      console.error('Access denied. User roles:', this.jwtHelper.getUserRoles());
      this.router.navigate(['/unauthorized'], {
        state: { message: this.errorMessage }
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.restApi.ajouterCategory({ body: this.categoryForm.value }).subscribe({
        next: (response) => {
          this.router.navigate(['/categories']);
        },
        error: (err) => {
          console.error('Failed to create category:', err);
          this.errorMessage = err.error?.message || 'Erreur lors de la création de la catégorie';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}
