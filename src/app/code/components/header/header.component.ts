import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout()
      .then(() => {
        // Redirect to the login page or show a success message
        this.router.navigate(['/login']);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }

}
