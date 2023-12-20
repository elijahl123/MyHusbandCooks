import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../app.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        unsubscribe();
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }
}
