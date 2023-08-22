import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.authService.signIn(email, password)
      .then(() => {
        // Redirect to home or other page
        this.router.navigate(['/']);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('Please enter a valid email address.');
            break;
          case 'auth/user-disabled':
            alert('This user has been disabled.');
            break;
          case 'auth/user-not-found':
            alert('There is no account associated with this email address.');
            break;
          case 'auth/wrong-password':
            alert('The password is invalid.');
            break;
          default:
            alert(error.message.split('Firebase: ')[1]);
            break;
        }
      });
  }
}
