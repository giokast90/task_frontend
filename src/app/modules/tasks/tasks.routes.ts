import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list/task-list.component';

/**
 * Defines the routes for the Tasks module of the application.
 * Includes routes for task management functionalities such as
 * viewing all tasks, creating a new task, and editing an existing task.
 */
export const TASKS_ROUTES: Routes = [
  /**
   * Default route for listing all tasks.
   * Displays the TaskListComponent to show the task list.
   */
  {
    path: '',
    component: TaskListComponent,
  },
  /**
   * Route for creating a new task.
   * Dynamically imports and displays the TaskFormComponent.
   */
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
  },
  /**
   * Route for editing an existing task.
   * Dynamically imports and displays the TaskFormComponent.
   * Uses the "id" parameter in the path to identify the task to be edited.
   */
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./pages/task-form/task-form.component').then(m => m.TaskFormComponent),
  },
];
