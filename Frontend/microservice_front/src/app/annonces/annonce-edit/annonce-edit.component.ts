import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from 'src/app/services_annonces/services/rest-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';
import { Category } from 'src/app/services_annonces/models/category';
import { Annonce } from 'src/app/services_annonces/models/annonce';

@Component({
  selector: 'app-annonce-edit',
  templateUrl: './annonce-edit.component.html',
  styleUrls: ['./annonce-edit.component.css']
})
export class AnnonceEditComponent implements OnInit {
  annonceForm: FormGroup;
  categories: Category[] = [];
  isLoading = false;
  errorMessage = '';
  categoryLoading = false;
  annonceId: number | null = null;
  currentAnnonce: Annonce | null = null;

  annonce: Annonce | null = null;

  constructor(
    private fb: FormBuilder,
    private restApi: RestApiService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) {
    this.annonceForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      statut: ['']
    });
  }

  get isAdmin(): boolean {
    return this.jwtHelper.hasAnyRole(['admin']);
  }

  ngOnInit() {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: this.router.url }
      });
      return;
    }

    if (!this.jwtHelper.hasUserOrAdminRole()) {
      this.errorMessage = 'You need user or admin privileges to edit an announcement';
      this.router.navigate(['/unauthorized'], {
        state: { message: this.errorMessage }
      });
      return;
    }

    this.loadCategories();
    this.loadAnnonce();
  }

  loadAnnonce(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'No announcement ID provided';
      return;
    }

    this.annonceId = +id;
    this.isLoading = true;
    this.errorMessage = '';

    this.restApi.obtenirAnnonceParId({ id: +id }).subscribe({
      next: (annonce) => {
        console.log('Annonce chargée :', annonce);
        if (!annonce) {
          this.errorMessage = 'Aucune annonce trouvée';
          this.isLoading = false;
          return;
        }

        this.annonce = annonce;

        this.annonceForm.patchValue({
          titre: annonce.titre,
          description: annonce.description,
          categoryId: annonce.category?.id,
          email: annonce.email,
          statut: annonce.statut
        });

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur API :', error);
        this.errorMessage = 'Erreur lors du chargement de l’annonce';
        this.isLoading = false;
      }
    });
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
    if (this.annonceForm.valid && this.annonceId) {
      this.isLoading = true;
      this.errorMessage = '';

      const formData = {
        id: this.annonceId,
        body: {
          ...this.annonceForm.value,
          id: this.annonceId
        }
      };

      this.restApi.modifierAnnonce(formData).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/admin/annonces']).catch(() => {
            this.router.navigate(['/admin/annonces']);
          });
        },
        error: (err) => {
          console.error('Failed to update announcement:', err);
          this.errorMessage = err.error?.message || 'Failed to update announcement';
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
