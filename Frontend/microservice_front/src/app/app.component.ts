import { Component } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'microservice_front';
  isAdminRoute = false;
  isLoginRoute = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.isAdminRoute = url.includes('/admin');
        this.isLoginRoute = url === '/login';
      });
  }
}
