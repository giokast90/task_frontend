# Task Management Application

A feature-rich Angular application for managing tasks. This application allows users to create, update, delete, and view tasks, with authentication and routing functionalities for a seamless user experience.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/giokast90/task_frontend.git
   ```
2. Navigate to the project directory:
   ```
   cd task_frontend
   ```
3. Install the required dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:4200`.

### Features:

- Login functionality to ensure secure access.
- Task management: Create, edit, view, delete, and toggle task states.
- Routing integrated with guards for authenticated navigation.
- Server-side rendering with hydration features.

### Routing Overview

- Default route (`/`): Redirects to `/tasks`.
- `/login`: Loads the login page dynamically.
- `/tasks`: Logged-in users can manage tasks here.

## Technologies Used

- **Framework:** Angular 17.3.0
- **Backend Integration:** Express 4.18.2
- **Styling Framework:** Bootstrap 5.3.6, Bootstrap Icons 1.13.1
- **State Management:** RxJS 7.8.0
- **Authentication:** Custom AuthService with Interceptors
- **SSR:** Angular server-side rendering (hydration)

## License

This project is licensed under the MIT License.
