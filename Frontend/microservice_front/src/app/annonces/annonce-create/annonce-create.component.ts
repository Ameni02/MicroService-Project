import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services_annonces/services/rest-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';
import { Category } from 'src/app/services_annonces/models/category';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  annonceForm: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';
  categoryLoading = false;

  constructor(
    private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    if (!this.jwtHelper.hasUserOrAdminRole()) {
      this.errorMessage = 'You need user or admin privileges to create an announcement';
      this.router.navigate(['/unauthorized'], {
        state: { message: this.errorMessage }
      });
      return;
    }

    this.loadCategories();
  }

  loadCategories() {
    this.categoryLoading = true;
    this.restApi.obtenirToutesLesCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load categories';
        this.categoryLoading = false;
        console.error(err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/admin/annonces']);
  }

  onSubmit() {
    if (this.annonceForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = {
        ...this.annonceForm.value,
        statut: 'EN_ATTENTE' // Default status
      };

      this.restApi.ajouterAnnonce({ body: formData }).subscribe({
        next: (response) => {
          this.isLoading = false;
          // Redirect to admin announcements page
          this.router.navigate(['/admin/annonces']).catch(err => {
            console.error('Navigation error:', err);
            this.router.navigate(['/home']);
          });
        },
        error: (err) => {
          console.error('Failed to create announcement:', err);
          this.errorMessage = err.error?.message || 'Failed to create announcement';
          this.isLoading = false;

          if (err.status === 401) {
            this.router.navigate(['/login'], {
              queryParams: { returnUrl: this.router.url }
            });
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly';
    }
  }
}
