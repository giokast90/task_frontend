import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root',
})
/**
 * Service responsible for handling task-related operations including
 * retrieving, adding, updating, and deleting tasks. It communicates
 * with the backend API and maps raw data into the application's
 * `Task` model for use.
 */
export class TaskService {
  private readonly baseUrl = 'https://us-central1-atom-task-backend.cloudfunctions.net/api/tasks';

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches all tasks from the backend API and converts
   * them into instances of the `Task` model.
   *
   * @returns An `Observable` that emits an array of tasks.
   */
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl).pipe(
      map(tasks => tasks.map(this.adaptTask))
    );
  }

  /**
   * Fetches a task by its unique identifier and maps
   * the raw data into the `Task` model.
   *
   * @param id - A string representing the unique identifier of the task.
   * @returns An `Observable` that emits the fetched `Task` object.
   */
  getById(id: string): Observable<Task> {
    return this.http.get<Task>(`${ this.baseUrl }/${ id }`).pipe(
      map(this.adaptTask)
    );
  }

  /**
   * Sends a new task's data to the backend API for creation.
   *
   * @param taskData - An object of the `Task` type containing the task's details.
   * @returns An `Observable` that emits the created `Task` object.
   */
  addTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, taskData);
  }

  /**
   * Updates specific fields of an existing task in the backend API.
   *
   * @param id - A string representing the unique identifier of the task.
   * @param task - An object containing partial data of the `Task` type to be updated.
   * @returns An `Observable` that emits the modified `Task` object.
   */
  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<any>(`${ this.baseUrl }/${ id }`, task);
  }

  /**
   * Removes a task from the backend API using its unique identifier.
   *
   * @param id - A string representing the unique identifier of the task.
   * @returns An `Observable` that emits `void` when the deletion is successful.
   */
  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${ this.baseUrl }/${ id }`);
  }

  /**
   * Converts raw task data from the API into a well-formed `Task` object.
   *
   * @param task - An object containing raw task details from the API response.
   * @returns An instance of the `Task` model with processed data.
   */
  private adaptTask = (task: any): Task => {
    return {
      ...task,
      createdAt: this.convertToDate(task.createdAt),
    };
  };

  /**
   * Transforms raw date representations from the API (including Firestore timestamps)
   * into JavaScript `Date` objects.
   *
   * @param value - A raw value potentially containing timestamp data.
   * @returns A JavaScript `Date` object or a fallback invalid date on invalid input.
   */
  private convertToDate(value: any): Date {
    if (value?._seconds !== undefined) {
      return new Date(value._seconds * 1000);
    }

    const date = new Date(value);
    return isNaN(date.getTime()) ? new Date('') : date;
  }
}
