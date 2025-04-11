import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;
  currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url.split('?')[0];
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // General navigation method
  navigateTo(route: string): void {
    this.router.navigate([route])
      .then(success => {
        if (!success) {
          console.error(`Navigation to ${route} failed`);
          this.router.navigate(['/']); // Fallback to home
        }
        this.isMenuOpen = false;
      });
  }

  // Special handling for feedbacks
  navigateToFeedbacks(): void {
    this.navigateTo('/feedbacks');
  }
}