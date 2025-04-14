// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { RestApiService } from 'src/app/services_annonces/services';
// import { Annonce } from 'src/app/services_annonces/models/annonce';
// import { Category } from 'src/app/services_annonces/models/category';
// import { JwtHelperService } from "../../../Security/JwtHelperService";
//
// @Component({
//   selector: 'app-annonce-management',
//   templateUrl: './annonce-management.component.html',
//   styleUrls: ['./annonce-management.component.css']
// })
// export class AnnonceManagementComponent implements OnInit {
//   activeTab: string = 'annonces';
//   annonces: Annonce[] = [];
//   weeklyAnnonces: Annonce[] = [];
//   pendingAnnonces: Annonce[] = [];
//   selectedAnnonce: Annonce | null = null;
//   loading = false;
//   deleteLoading: { [id: number]: boolean } = {}; // Track delete loading states
//   error: string | null = null;
//   showAnnonceDetail = false;
//
//   categories: Category[] = [];
//   categoryLoading = false;
//   categoryError: string | null = null;
//   newCategory: Omit<Category, 'id'> = { nom: '', annonces: [] };
//
//   constructor(
//     private router: Router,
//     private annonceService: RestApiService,
//     private jwtHelper: JwtHelperService
//   ) {}
//
//   ngOnInit(): void {
//     this.loadInitialData();
//   }
//
//   loadInitialData(): void {
//     this.loadAnnonces();
//     this.loadWeeklyAnnonces();
//     this.loadPendingAnnonces();
//     this.loadCategories();
//   }
//
//   setActiveTab(tab: string): void {
//     this.activeTab = tab;
//   }
//
//   loadAnnonces(): void {
//     this.loading = true;
//     this.error = null;
//
//     this.annonceService.getAnnoncesAujourdhui().subscribe({
//       next: (annonces) => {
//         this.annonces = annonces;
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error = 'Failed to load today\'s announcements';
//         this.loading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   loadWeeklyAnnonces(): void {
//     this.loading = true;
//     this.error = null;
//
//     this.annonceService.getAnnoncesCetteSemaine().subscribe({
//       next: (annonces) => {
//         this.weeklyAnnonces = annonces;
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error = 'Failed to load weekly announcements';
//         this.loading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   loadPendingAnnonces(): void {
//     this.loading = true;
//     this.error = null;
//
//     this.annonceService.rechercherAnnonces({ statut: 'EN_ATTENTE' }).subscribe({
//       next: (response: any) => {
//         // Handle case where response is a Blob
//         if (response instanceof Blob) {
//           this.handleBlobResponse(response);
//           return;
//         }
//
//         // Handle normal array response
//         this.pendingAnnonces = Array.isArray(response) ? response : [response];
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error = 'Failed to load pending announcements';
//         this.loading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   private handleBlobResponse(blob: Blob): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       try {
//         const content = reader.result as string;
//         const jsonResponse = JSON.parse(content);
//
//         if (Array.isArray(jsonResponse)) {
//           this.pendingAnnonces = jsonResponse;
//         } else {
//           this.error = 'Unexpected response format from server';
//           console.error('Server returned:', jsonResponse);
//         }
//       } catch (e) {
//         this.error = 'Failed to parse server response';
//         console.error('Error parsing Blob:', e);
//       } finally {
//         this.loading = false;
//       }
//     };
//     reader.readAsText(blob);
//   }
//
//
//   loadAllAnnonces(): void {
//     this.loading = true;
//     this.error = null;
//
//     this.annonceService.obtenirToutesLesAnnonces().subscribe({
//       next: (annonces) => {
//         this.annonces = annonces;
//         this.loading = false;
//       },
//       error: (error) => {
//         this.error = 'Failed to load all announcements';
//         this.loading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   // Update the viewAnnonceDetail method
//   viewAnnonceDetail(id: number): void {
//     if (!id) return;
//
//     this.loading = true;
//     this.error = null;
//     this.showAnnonceDetail = true;
//
//     this.annonceService.obtenirAnnonceParId({ id }).subscribe({
//       next: (annonce) => {
//         if (!annonce) {
//           this.error = 'Announcement not found';
//           this.closeAnnonceDetail();
//           return;
//         }
//         this.selectedAnnonce = annonce;
//         this.loading = false;
//         document.body.classList.add('modal-open');
//       },
//       error: (error) => {
//         this.error = 'Failed to load announcement details';
//         this.loading = false;
//         this.closeAnnonceDetail();
//         console.error(error);
//       }
//     });
//   }
//
//
// // Update the closeAnnonceDetail method
//   closeAnnonceDetail(): void {
//     this.showAnnonceDetail = false;
//     this.selectedAnnonce = null;
//     document.body.classList.remove('modal-open');
//   }
//
//   validateAnnonce(id: number): void {
//     if (!id) return;
//
//     if (confirm('Are you sure you want to approve this announcement?')) {
//       this.loading = true;
//       this.error = null;
//
//       this.annonceService.validerAnnonce({ id }).subscribe({
//         next: (annonce) => {
//           this.updateAnnonceInLists(annonce);
//           this.loading = false;
//           if (this.showAnnonceDetail && this.selectedAnnonce?.id === annonce.id) {
//             this.selectedAnnonce = annonce;
//           }
//         },
//         error: (error) => {
//           this.error = 'Failed to approve announcement';
//           this.loading = false;
//           console.error(error);
//         }
//       });
//     }
//   }
//
//   rejectAnnonce(id: number): void {
//     if (!id) return;
//
//     if (confirm('Are you sure you want to reject this announcement?')) {
//       this.loading = true;
//       this.error = null;
//
//       this.annonceService.rejeterAnnonce({ id }).subscribe({
//         next: (annonce) => {
//           this.updateAnnonceInLists(annonce);
//           this.loading = false;
//           if (this.showAnnonceDetail && this.selectedAnnonce?.id === annonce.id) {
//             this.selectedAnnonce = annonce;
//           }
//         },
//         error: (error) => {
//           this.error = 'Failed to reject announcement';
//           this.loading = false;
//           console.error(error);
//         }
//       });
//     }
//   }
//
//   deleteAnnonce(id: number): void {
//     if (!id) return;
//
//     if (confirm('Are you sure you want to delete this announcement?')) {
//       this.deleteLoading[id] = true;
//       this.error = null;
//
//       this.annonceService.supprimerAnnonce({ id }).subscribe({
//         next: () => {
//           this.removeAnnonceFromLists(id);
//           this.deleteLoading[id] = false;
//         },
//         error: (error) => {
//           this.error = 'Failed to delete announcement';
//           this.deleteLoading[id] = false;
//           console.error(error);
//         }
//       });
//     }
//   }
//
//   private updateAnnonceInLists(updatedAnnonce: Annonce): void {
//     // Update in all lists
//     this.annonces = this.updateInList(this.annonces, updatedAnnonce);
//     this.weeklyAnnonces = this.updateInList(this.weeklyAnnonces, updatedAnnonce);
//     this.pendingAnnonces = this.pendingAnnonces.filter(a => a.id !== updatedAnnonce.id);
//   }
//   private updateInList(list: Annonce[], updatedAnnonce: Annonce): Annonce[] {
//     const index = list.findIndex(a => a.id === updatedAnnonce.id);
//     if (index !== -1) {
//       list[index] = updatedAnnonce;
//     }
//     return [...list];
//   }
//
//   private removeAnnonceFromLists(id: number): void {
//     this.annonces = this.annonces.filter(a => a.id !== id);
//     this.weeklyAnnonces = this.weeklyAnnonces.filter(a => a.id !== id);
//     this.pendingAnnonces = this.pendingAnnonces.filter(a => a.id !== id);
//     if (this.selectedAnnonce?.id === id) {
//       this.closeAnnonceDetail();
//     }
//   }
//
//   loadCategories(): void {
//     this.categoryLoading = true;
//     this.categoryError = null;
//
//     this.annonceService.obtenirToutesLesCategories().subscribe({
//       next: (categories) => {
//         this.categories = categories;
//         this.categoryLoading = false;
//       },
//       error: (error) => {
//         this.categoryError = 'Failed to load categories';
//         this.categoryLoading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   createCategory(): void {
//     if (!this.newCategory.nom) {
//       this.categoryError = 'Category name is required';
//       return;
//     }
//
//     this.categoryLoading = true;
//     this.categoryError = null;
//
//     this.annonceService.ajouterCategory({
//       body: {
//         nom: this.newCategory.nom,
//         annonces: []
//       }
//     }).subscribe({
//       next: (category) => {
//         this.categories.push(category);
//         this.newCategory = { nom: '', annonces: [] };
//         this.categoryLoading = false;
//       },
//       error: (error) => {
//         this.categoryError = 'Failed to create category';
//         this.categoryLoading = false;
//         console.error(error);
//       }
//     });
//   }
//
//   deleteCategory(id?: number): void {
//     if (!id) {
//       this.categoryError = 'Cannot delete: ID is undefined';
//       return;
//     }
//
//     if (confirm('Are you sure you want to delete this category?')) {
//       this.annonceService.supprimerCategory({ id }).subscribe({
//         next: () => {
//           this.categories = this.categories.filter(c => c.id !== id);
//         },
//         error: (error) => {
//           this.categoryError = 'Failed to delete category';
//           console.error(error);
//         }
//       });
//     }
//   }
//
//   createAnnonce(): void {
//     if (!this.jwtHelper.isAuthenticated()) {
//       this.router.navigate(['/login'], {
//         queryParams: { returnUrl: '/annonces/new' }
//       });
//       return;
//     }
//
//     if (!this.jwtHelper.hasUserOrAdminRole()) {
//       this.error = 'You need user or admin privileges to create an announcement';
//       this.router.navigate(['/unauthorized']);
//       return;
//     }
//
//     this.router.navigate(['/annonces/new']);
//   }
//
//   editAnnonce(id: number): void {
//     if (!id) return;
//     this.router.navigate(['/annonces', id, 'edit']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from 'src/app/services_annonces/services';
import { Annonce } from 'src/app/services_annonces/models/annonce';
import { Category } from 'src/app/services_annonces/models/category';
import { JwtHelperService } from "../../../Security/JwtHelperService";

@Component({
  selector: 'app-annonce-management',
  templateUrl: './annonce-management.component.html',
  styleUrls: ['./annonce-management.component.css']
})
export class AnnonceManagementComponent implements OnInit {
  activeTab: string = 'annonces';
  annonces: Annonce[] = [];
  weeklyAnnonces: Annonce[] = [];
  pendingAnnonces: Annonce[] = [];
  selectedAnnonce: Annonce | null = null;
  loading = false;
  deleteLoading: { [id: number]: boolean } = {};
  error: string | null = null;
  showAnnonceDetail = false;

  categories: Category[] = [];
  categoryLoading = false;
  categoryError: string | null = null;
  newCategory: Omit<Category, 'id'> = { nom: '', annonces: [] };

  constructor(
    private router: Router,
    private annonceService: RestApiService,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.loadAnnonces();
    this.loadWeeklyAnnonces();
    this.loadPendingAnnonces();
    this.loadCategories();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  loadAnnonces(): void {
    this.loading = true;
    this.error = null;
    this.annonceService.getAnnoncesAujourdhui().subscribe({
      next: (annonces) => {
        this.annonces = annonces;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load today\'s announcements';
        this.loading = false;
        console.error(error);
      }
    });
  }

  loadWeeklyAnnonces(): void {
    this.loading = true;
    this.error = null;
    this.annonceService.getAnnoncesCetteSemaine().subscribe({
      next: (annonces) => {
        this.weeklyAnnonces = annonces;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load weekly announcements';
        this.loading = false;
        console.error(error);
      }
    });
  }

  loadPendingAnnonces(): void {
    this.loading = true;
    this.error = null;
    this.annonceService.rechercherAnnonces({ statut: 'EN_ATTENTE' }).subscribe({
      next: (response: any) => {
        if (response instanceof Blob) {
          this.handleBlobResponse(response);
          return;
        }
        this.pendingAnnonces = Array.isArray(response) ? response : [response];
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load pending announcements';
        this.loading = false;
        console.error(error);
      }
    });
  }

  private handleBlobResponse(blob: Blob): void {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = reader.result as string;
        const jsonResponse = JSON.parse(content);
        this.pendingAnnonces = Array.isArray(jsonResponse) ? jsonResponse : [jsonResponse];
      } catch (e) {
        this.error = 'Failed to parse server response';
        console.error('Error parsing Blob:', e);
      } finally {
        this.loading = false;
      }
    };
    reader.readAsText(blob);
  }

  loadAllAnnonces(): void {
    this.loading = true;
    this.error = null;
    this.annonceService.obtenirToutesLesAnnonces().subscribe({
      next: (annonces) => {
        this.annonces = annonces;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load all announcements';
        this.loading = false;
        console.error(error);
      }
    });
  }

  viewAnnonceDetail(id: number): void {
    console.log('Viewing annonce detail for ID:', id); // Debug log
    if (!id) return;

    this.loading = true;
    this.error = null;
    this.showAnnonceDetail = true;
    console.log('showAnnonceDetail set to:', this.showAnnonceDetail); // Debug log

    this.annonceService.obtenirAnnonceParId({ id }).subscribe({
      next: (annonce) => {
        console.log('Received annonce:', annonce); // Debug log
        this.selectedAnnonce = annonce;
        this.loading = false;
        document.body.classList.add('modal-open');
      },
      error: (error) => {
        console.error('Error loading annonce:', error); // Debug log
        this.error = 'Failed to load announcement details';
        this.loading = false;
        this.closeAnnonceDetail();
      }
    });
  }

  closeAnnonceDetail(): void {
    this.showAnnonceDetail = false;
    this.selectedAnnonce = null;
    document.body.classList.remove('modal-open');
  }

  validateAnnonce(id: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to approve this announcement?')) {
      this.loading = true;
      this.error = null;

      this.annonceService.validerAnnonce({ id }).subscribe({
        next: (annonce) => {
          this.updateAnnonceInLists(annonce);
          this.loading = false;
          if (this.showAnnonceDetail && this.selectedAnnonce?.id === annonce.id) {
            this.selectedAnnonce = annonce;
          }
        },
        error: (error) => {
          this.error = 'Failed to approve announcement';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  rejectAnnonce(id: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to reject this announcement?')) {
      this.loading = true;
      this.error = null;

      this.annonceService.rejeterAnnonce({ id }).subscribe({
        next: (annonce) => {
          this.updateAnnonceInLists(annonce);
          this.loading = false;
          if (this.showAnnonceDetail && this.selectedAnnonce?.id === annonce.id) {
            this.selectedAnnonce = annonce;
          }
        },
        error: (error) => {
          this.error = 'Failed to reject announcement';
          this.loading = false;
          console.error(error);
        }
      });
    }
  }

  deleteAnnonce(id: number): void {
    if (!id) return;

    if (confirm('Are you sure you want to delete this announcement?')) {
      this.deleteLoading[id] = true;
      this.error = null;

      this.annonceService.supprimerAnnonce({ id }).subscribe({
        next: () => {
          this.removeAnnonceFromLists(id);
          this.deleteLoading[id] = false;
        },
        error: (error) => {
          this.error = 'Failed to delete announcement';
          this.deleteLoading[id] = false;
          console.error(error);
        }
      });
    }
  }

  private updateAnnonceInLists(updatedAnnonce: Annonce): void {
    this.annonces = this.updateInList(this.annonces, updatedAnnonce);
    this.weeklyAnnonces = this.updateInList(this.weeklyAnnonces, updatedAnnonce);
    this.pendingAnnonces = this.pendingAnnonces.filter(a => a.id !== updatedAnnonce.id);
  }

  private updateInList(list: Annonce[], updatedAnnonce: Annonce): Annonce[] {
    const index = list.findIndex(a => a.id === updatedAnnonce.id);
    if (index !== -1) {
      list[index] = updatedAnnonce;
    }
    return [...list];
  }

  private removeAnnonceFromLists(id: number): void {
    this.annonces = this.annonces.filter(a => a.id !== id);
    this.weeklyAnnonces = this.weeklyAnnonces.filter(a => a.id !== id);
    this.pendingAnnonces = this.pendingAnnonces.filter(a => a.id !== id);
    if (this.selectedAnnonce?.id === id) {
      this.closeAnnonceDetail();
    }
  }

  loadCategories(): void {
    this.categoryLoading = true;
    this.categoryError = null;

    this.annonceService.obtenirToutesLesCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.categoryLoading = false;
      },
      error: (error) => {
        this.categoryError = 'Failed to load categories';
        this.categoryLoading = false;
        console.error(error);
      }
    });
  }

  createCategory(): void {
    if (!this.newCategory.nom) {
      this.categoryError = 'Category name is required';
      return;
    }

    this.categoryLoading = true;
    this.categoryError = null;

    this.annonceService.ajouterCategory({
      body: {
        nom: this.newCategory.nom,
        annonces: []
      }
    }).subscribe({
      next: (category) => {
        this.categories.push(category);
        this.newCategory = { nom: '', annonces: [] };
        this.categoryLoading = false;
      },
      error: (error) => {
        this.categoryError = 'Failed to create category';
        this.categoryLoading = false;
        console.error(error);
      }
    });
  }

  deleteCategory(id?: number): void {
    if (!id) {
      this.categoryError = 'Cannot delete: ID is undefined';
      return;
    }

    if (confirm('Are you sure you want to delete this category?')) {
      this.annonceService.supprimerCategory({ id }).subscribe({
        next: () => {
          this.categories = this.categories.filter(c => c.id !== id);
        },
        error: (error) => {
          this.categoryError = 'Failed to delete category';
          console.error(error);
        }
      });
    }
  }

  createAnnonce(): void {
    if (!this.jwtHelper.isAuthenticated()) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/annonces/new' }
      });
      return;
    }

    if (!this.jwtHelper.hasUserOrAdminRole()) {
      this.error = 'You need user or admin privileges to create an announcement';
      this.router.navigate(['/unauthorized']);
      return;
    }

    this.router.navigate(['/annonces/new']);
  }

  editAnnonce(id: number): void {
    if (!id) return;
    this.router.navigate(['/annonces', id, 'edit']);
  }
}
