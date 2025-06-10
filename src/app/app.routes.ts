import { Routes } from '@angular/router';
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'tasks',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/tasks/tasks.routes').then(m => m.TASKS_ROUTES)
  }
];
