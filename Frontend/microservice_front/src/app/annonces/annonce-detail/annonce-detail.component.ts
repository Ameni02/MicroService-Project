import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../../services_annonces/services';
import { Annonce } from '../../services_annonces/models/annonce';
import { Location } from '@angular/common';
import { JwtHelperService } from "../../Security/JwtHelperService";

@Component({
  selector: 'app-annonce-detail',
  templateUrl: './annonce-detail.component.html',
  styleUrls: ['./annonce-detail.component.css']
})
export class AnnonceDetailComponent implements OnInit {
  annonce: Annonce | null = null;
  loading = false;
  error: string | null = null;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private annonceService: RestApiService,
    private location: Location,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.jwtHelper.hasAnyRole(['ADMIN']); // Changed from hasAdminRole() to hasAnyRole()
    this.loadAnnonce();
  }

  loadAnnonce(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'No announcement ID provided';
      return;
    }

    this.loading = true;
    this.error = null;

    this.annonceService.obtenirAnnonceParId({ id: +id }).subscribe({
      next: (annonce) => {
        this.annonce = annonce;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load announcement details';
        this.loading = false;
        console.error(error);
      }
    });
  }

  approveAnnonce(): void {
    if (!this.annonce?.id) return;

    if (confirm('Are you sure you want to approve this announcement?')) {
      this.loading = true;
      this.annonceService.validerAnnonce({ id: this.annonce.id }).subscribe({
        next: (updatedAnnonce) => {
          this.annonce = updatedAnnonce;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to approve announcement';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  rejectAnnonce(): void {
    if (!this.annonce?.id) return;

    if (confirm('Are you sure you want to reject this announcement?')) {
      this.loading = true;
      this.annonceService.rejeterAnnonce({ id: this.annonce.id }).subscribe({
        next: (updatedAnnonce) => {
          this.annonce = updatedAnnonce;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to reject announcement';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  editAnnonce(): void {
    if (!this.annonce?.id) return;
    this.router.navigate(['/annonces', this.annonce.id, 'edit']);
  }

  deleteAnnonce(): void {
    if (!this.annonce?.id) return;

    if (confirm('Are you sure you want to delete this announcement?')) {
      this.loading = true;
      this.annonceService.supprimerAnnonce({ id: this.annonce.id }).subscribe({
        next: () => {
          this.router.navigate(['/annonces']);
        },
        error: (error) => {
          this.error = 'Failed to delete announcement';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }
}
