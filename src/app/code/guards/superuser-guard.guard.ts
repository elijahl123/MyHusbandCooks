import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class SuperuserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        unsubscribe();
        if (user) {
          this.authService.getUser().then(user => {
            if (user && user.superuser) {
              resolve(true);
            } else {
              this.router.navigate(['/']); // Redirect to home or another page
              resolve(false);
            }
          });
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
