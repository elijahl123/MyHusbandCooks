import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private authService: AuthService) {
  }

  register(email: string, password: string) {
    this.authService.signUp(email, password)
      .then(() => {
        // Redirect to home or other page
      })
      .catch(error => {
        console.log(error.message);
      });
  }
}
