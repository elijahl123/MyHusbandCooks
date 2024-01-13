import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { app } from '../../../app.module';
import { faBars, faEdit } from '@fortawesome/pro-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuIcon: IconDefinition = faBars;
  isLoggedIn = false;

  isSuperuser = false;
  isMenuOpen = false;
  protected readonly editIcon = faEdit;

  constructor(private authService: AuthService, private router: Router) {
    const auth = getAuth(app);
    onAuthStateChanged(auth, async user => {
      this.isLoggedIn = !!user;
      if (user) {
        const userData = await this.authService.getUser();
        this.isSuperuser = userData?.superuser || false;
      } else {
        this.isSuperuser = false;
      }
    });
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
