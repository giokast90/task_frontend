/**
 * Configuration file for setting up Angular application-level services and providers.
 * This includes routing, HTTP client with interceptors, form management, and hydration.
 */
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { authInterceptor } from "./core/interceptors/auth.interceptor";

/**
 * Application configuration object that specifies global providers for the Angular application.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Imports and provides support for Angular template-driven forms.
     */
    importProvidersFrom(FormsModule),

    /**
     * Configures the HTTP client with an authentication interceptor to handle request modifications globally.
     */
    provideHttpClient(withInterceptors([authInterceptor])),

    /**
     * Configures the application's routing with predefined routes from `app.routes.ts`.
     */
    provideRouter(routes),

    /**
     * Ensures the application supports client-side hydration for server-side rendering.
     */
    provideClientHydration()
  ]
};
