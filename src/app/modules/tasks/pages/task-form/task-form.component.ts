import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from "../../../../core/services/task/task.service";
import { Task } from "../../../../core/models/task.model";
import { CommonModule } from '@angular/common';

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

  private toTaskModel(formValue: { [key: string]: any }): Task {
    return {
      id: this.taskId || '',
      title: formValue["title"],
      description: formValue["description"] || ''
    };
  }
}
