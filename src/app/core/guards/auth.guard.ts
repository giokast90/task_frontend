import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";

/**
 * Authorization guard function to control route access.
 *
 * This function checks if a user is logged in using the `AuthService`.
 * If the user is logged in, access is granted by returning `true`.
 * Otherwise, the user is redirected to the '/login' route using the `Router`
 * and access is denied by returning `false`.
 *
 * @returns {boolean} - A boolean indicating whether access is allowed (`true`) or denied (`false`).
 */
export const authGuard: CanActivateFn = (): boolean => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']).then();
  return false;
};
