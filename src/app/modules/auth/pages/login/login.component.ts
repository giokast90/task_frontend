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
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private modal: bootstrap.Modal | null = null;
  private pendingEmail: string | null = null;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  loading = false;
  error: string | null = null;

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

  private showModal() {
    const modalElement = document.getElementById('confirmCreateModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

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
