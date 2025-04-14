import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/services/services/auth-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from 'src/app/Security/JwtHelperService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  returnUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthControllerService,
    private router: Router,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/';
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginParams = {
        body: {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        }
      };

      this.authService.login(loginParams).subscribe({
        next: (response: any) => {
          const token = response.accessToken;
          if (token) {
            localStorage.setItem('auth_token', token);

            // Redirect based on role
            if (this.jwtHelper.isAdmin()) {
              this.router.navigate(['/admin']);
            } else {
              // Check if there's a returnUrl, otherwise go to home
              const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
              this.router.navigateByUrl(returnUrl);
            }
          } else {
            this.errorMessage = 'No token received from server';
          }
          this.isLoading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.error('Login failed:', err);
          this.isLoading = false;
          if (err.status === 401) {
            this.errorMessage = 'Invalid username or password';
          } else {
            this.errorMessage = err.error?.message || 'Login failed. Please try again.';
          }
        }
      });
    }
  }
}
