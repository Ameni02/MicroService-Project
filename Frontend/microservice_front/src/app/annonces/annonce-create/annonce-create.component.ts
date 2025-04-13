import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services_annonces/services/rest-api.service';
import { Router } from '@angular/router';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';

@Component({
  selector: 'app-annonce-create',
  templateUrl: './annonce-create.component.html',
  styleUrls: ['./annonce-create.component.css']
})
export class AnnonceCreateComponent implements OnInit {
  annonceForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.annonceForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
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

    if (!this.jwtHelper.isUser()) {
      this.errorMessage = 'Vous devez avoir le rôle utilisateur pour créer une annonce';
      console.error('Access denied. User roles:', this.jwtHelper.getUserRoles());
      this.router.navigate(['/unauthorized'], {
        state: { message: this.errorMessage }
      });
    }
  }

  onSubmit() {
    if (this.annonceForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.restApi.ajouterAnnonce({ body: this.annonceForm.value }).subscribe({
        next: (response) => {
          this.router.navigate(['/annonces', response.id]);
        },
        error: (err) => {
          console.error('Failed to create ad:', err);
          this.errorMessage = err.error?.message || 'Erreur lors de la création de l\'annonce';
          this.isLoading = false;
        }
      });
    }
  }
}
