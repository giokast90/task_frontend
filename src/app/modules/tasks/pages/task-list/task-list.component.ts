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
export class TaskListComponent implements OnInit {
  private taskService = inject(TaskService);
  private authService = inject(AuthService);
  private router = inject(Router);
  tasks: Task[] = [];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe((tasks) => (this.tasks = tasks));
  }

  trackById(index: number, task: Task) {
    return task.id;
  }

  toggleCompleted(task: Task): void {
    const updated = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id!, updated).subscribe(() => this.loadTasks());
  }

  deleteTask(id: string) {
    if (confirm('Do you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  editTask(id: string) {
    this.router.navigate(['/tasks/edit', id]).then();
  }

  goToLogin() {
    this.authService.logout();
  }
}
