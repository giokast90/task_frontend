import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly baseUrl = 'https://us-central1-atom-task-backend.cloudfunctions.net/api/tasks';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl).pipe(
      map(tasks => tasks.map(this.adaptTask))
    );
  }

  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${ this.baseUrl }/${ id }`).pipe(
      map(this.adaptTask)
    );
  }

  addTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, taskData);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<any>(`${ this.baseUrl }/${ id }`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.baseUrl }/${ id }`);
  }

  private adaptTask = (task: any): Task => {
    return {
      ...task,
      createdAt: this.convertToDate(task.createdAt),
    };
  };

  private convertToDate(value: any): Date {
    if (value?._seconds !== undefined) {
      return new Date(value._seconds * 1000);
    }

    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date('') : date;
  }
}
