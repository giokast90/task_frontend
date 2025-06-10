import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of, tap } from 'rxjs';

// @ts-ignore
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
/**
 * LoginComponent is responsible for handling user login operations.
 * It provides a form for the user to input their email, handles login submissions,
 * and also manages account creation workflow via a modal dialog for unregistered users.
 */
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private modal: bootstrap.Modal | null = null;
  private pendingEmail: string | null = null;

  /**
   * Reactive form group for the login form.
   * Includes an email field with validation for required to be input and valid email format.
   */
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  /**
   * Indicates whether a login or registration request is currently being processed.
   */
  loading = false;
  /**
   * Stores an error message, if any, to display to the user upon a failed operation.
   */
  error: string | null = null;

  /**
   * Handles the submission of the login form. If the form is valid, it attempts to log in the user.
   * If the user is not found (status 404), it stores the email and triggers the account creation modal.
   */
  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = null;
    const email = this.form.value.email;

    this.authService.login(email).pipe(
      tap(() => this.router.navigate(['/tasks'])),
      catchError(err => {
        if (err.status === 404) {
          this.loading = false;
          this.pendingEmail = email;
          this.showModal();
        } else {
          this.error = 'An error occurred while trying to login. Please try again later.';
          this.loading = false;
        }
        return of();
      })
    ).subscribe();
  }

  /**
   * Displays the modal dialog for account creation.
   * Initializes the Bootstrap modal instance and shows the modal.
   */
  private showModal() {
    const modalElement = document.getElementById('confirmCreateModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  /**
   * Confirms the account creation when the "Create Account" button in the modal is clicked.
   * Registers the user using the stored pending email and navigates to the task dashboard on success.
   */
  onConfirmCreate() {
    if (!this.pendingEmail) return;

    this.loading = true;
    this.authService.register(this.pendingEmail).pipe(
      tap(() => {
        this.modal?.hide();
        this.router.navigate(['/tasks']).then();
      }),
      catchError(() => {
        this.error = 'We cannot create an account for you at this time. Please try again later.';
        this.loading = false;
        return of();
      })
    ).subscribe();
  }
}
