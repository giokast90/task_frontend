/**
 * Routes configuration for the Angular application.
 * This file defines the application-level routing paths, including lazy-loaded modules and route guards.
 * Key routes:
 * - Default route redirects to the 'tasks' page.
 * - Login route dynamically loads the login component.
 * - Task route is guarded by the `authGuard` and lazily loads the task module routes.
 */
import { Routes } from '@angular/router';
import { authGuard } from "./core/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full', // Redirects empty URL to the 'tasks' route.
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./modules/auth/pages/login/login.component').then(m => m.LoginComponent), // Dynamically imports and loads the login component.
  },
  {
    path: 'tasks',
    canActivate: [authGuard], // Protects the 'tasks' route with the authGuard to ensure only authorized users can access it.
    loadChildren: () =>
      import('./modules/tasks/tasks.routes').then(m => m.TASKS_ROUTES) // Lazily loads the routes for the 'tasks' module.
  }
];
