import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  register() {
    const { email, password, firstName, lastName } = this.registerForm.value;
    this.authService.signUp(email, password, firstName, lastName)
      .then(() => {
        // Redirect to home or other page
        this.router.navigate(['/']);
      })
      .catch(error => {
        // Write a switch statement to handle all the errors and default to a generic message.
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('There is already an account with this email address.');
            break;
          case 'auth/invalid-email':
            alert('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            alert('Password should be at least 6 characters.');
            break;
          default:
            alert(error.message.split('Firebase: ')[1]);
            break;
        }
      });
  }
}
