import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';

export const TASKS_ROUTES: Routes = [
  {
    path: '',
    component: TaskListComponent,
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
  },
];
