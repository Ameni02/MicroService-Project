import { Component, OnInit } from '@angular/core';
import { RestApiService } from 'src/app/services_annonces/services/rest-api.service';
import { Annonce } from 'src/app/services_annonces/models/annonce';
import { Router } from '@angular/router';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';

@Component({
  selector: 'app-annonce-front',
  templateUrl: './annonce-front.component.html',
  styleUrls: ['./annonce-front.component.css']
})
export class AnnonceFrontComponent implements OnInit {
  annonces: Annonce[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private restApi: RestApiService,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.loadAllAnnonces(); // <-- Remplacer ici
  }

  loadAllAnnonces(): void {
    this.loading = true;
    this.error = null;

    this.restApi.obtenirToutesLesAnnonces().subscribe({
      next: (annonces: Annonce[]) => {
        this.annonces = annonces.filter(a => a.statut === 'APPROUVEE');
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'Failed to load announcements';
        this.loading = false;
        console.error('Error loading announcements:', error);
      }
    });
  }


  navigateToCreate(): void {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/annonces/new' }
      });
      return;
    }

    if (!this.jwtHelper.hasUserOrAdminRole()) {
      this.error = 'You need user or admin privileges to create an announcement';
      return;
    }

    this.router.navigate(['/annonces/new']);
  }

  getStatusBadgeClass(status: string | undefined): string {
    if (!status) return 'bg-secondary';

    switch(status) {
      case 'APPROUVEE': return 'bg-success';
      case 'EN_ATTENTE': return 'bg-warning';
      case 'REJETEE': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
