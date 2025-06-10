import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from "../../../../core/services/task/task.service";
import { Task } from "../../../../core/models/task.model";
import { CommonModule } from '@angular/common';

/**
 * TaskFormComponent is responsible for managing the form used to create or update tasks.
 * It retrieves existing task data for editing and handles the form's submission
 * to create or update tasks via the TaskService.
 */
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required]],
  });

  loading = false;
  taskId: string | null = null;

  /**
   * Initializes the component by checking for an existing `id` in the URL.
   * If an `id` is present, it fetches the corresponding task data and populates the form.
   */
  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getById(this.taskId).subscribe((task: Task) => {
        if (task) {
          this.form.patchValue(task);
        }
      });
    }
  }

  /**
   * Handles the form submission process. Creates or updates a task based on
   * whether an existing `id` is available. Prevents submission if the form is invalid.
   * Navigates to the task list upon success or resets the loading state on error.
   */
  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;

    const taskData = this.toTaskModel(this.form.value);

    const request = this.taskId
      ? this.taskService.updateTask(this.taskId, taskData)
      : this.taskService.addTask(taskData);

    request.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: () => (this.loading = false),
    });
  }

  /**
   * Converts the form's `formValue` into a `Task` object, ensuring all properties
   * are properly formatted for the API or data storage layer.
   *
   * @param formValue - The form's current value as an object.
   * @returns A `Task` object with `id`, `title`, and `description` fields.
   */
  private toTaskModel(formValue: { [key: string]: any }): Task {
    return {
      id: this.taskId || '',
      title: formValue["title"],
      description: formValue["description"] || ''
    };
  }
}
