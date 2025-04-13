import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/services/services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthControllerService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Send the form value directly without wrapping in {body: ...}
      this.authService.register({body: this.signupForm.value}).subscribe({
        next: (response: any) => {
          console.log('Registration response:', response);
          this.isLoading = false;

          // Check for both possible response formats
          const userId = response?.userId || response?.body?.userId;
          if (userId) {
            this.successMessage = 'Registration successful! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = 'Registration completed but with unexpected response format';
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Registration error:', err);
          this.isLoading = false;

          // Handle different error cases
          if (err.status === 409) {
            this.errorMessage = 'Username or email already exists';
          } else if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Registration failed. Please try again.';
          }
        }
      });
    }
  }
}
