import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  login(email: string, password: string) {
    this.authService.signIn(email, password)
      .then(() => {
        // Redirect to home or other page
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
