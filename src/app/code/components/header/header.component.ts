import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private authService: AuthService) {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      this.isLoggedIn = !!user;
    });
  }

  logout() {
    this.authService.signOut();
  }
}
