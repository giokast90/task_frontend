import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../core/services/task/task.service';
import { Router, RouterModule } from '@angular/router';
import { Task } from '../../../../core/models/task.model';
import { AuthService } from "../../../../core/services/auth/auth.service";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
/**
 * Component for displaying and managing a list of tasks.
 */
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);
  /**
   * List of tasks fetched from the TaskService.
   */
  tasks: Task[] = [];

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Loads the tasks when the component is initialized.
   */
  ngOnInit(): void {
    this.loadTasks();
  }

  /**
   * Fetches the list of tasks from the TaskService and assigns it to the `tasks` property.
   */
  loadTasks(): void {
    this.taskService.getAll().subscribe((tasks) => (this.tasks = tasks));
  }

  /**
   * Tracks task items by their unique identifier.
   *
   * @param index The index of the task in the list.
   * @param task The task object.
   * @returns The unique identifier of the task.
   */
  trackById(index: number, task: Task) {
    return task.id;
  }

  /**
   * Toggles the completed status of a given task and updates the task list.
   *
   * @param task The task whose completed status will be toggled.
   */
  toggleCompleted(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id!, updated).subscribe(() => this.loadTasks());
  }

  /**
   * Deletes a task by its ID after user confirmation and refreshes the task list.
   *
   * @param id The unique identifier of the task to be deleted.
   */
  deleteTask(id: string) {
    if (confirm('Do you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  /**
   * Navigates to the task edit page for the given task ID.
   *
   * @param id The unique identifier of the task to edit.
   */
  editTask(id: string) {
    this.router.navigate(['/tasks/edit', id]).then();
  }

  /**
   * Logs the user out via the AuthService.
   */
  goToLogin() {
    this.authService.logout();
  }
}
