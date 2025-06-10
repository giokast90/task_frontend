/**
 * Represents a task with basic properties to manage and track its details.
 */
export interface Task {
  /**
   * Unique identifier for the task.
   */
  id: string;

  /**
   * Title of the task.
   */
  title: string;

  /**
   * Optional detailed description of the task.
   */
  description?: string;

  /**
   * Optional flag indicating whether the task is completed.
   */
  completed?: boolean;

  /**
   * Optional timestamp for when the task was created.
   */
  createdAt?: Date;
}
