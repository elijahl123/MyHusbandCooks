import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    const user = await this.authService.getUser();
    if (user && user.superuser) {
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to home or another page
      return false;
    }
  }
}
