import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Login and navigate based on role
  async onLogin() {
    try {
      // Authenticate user
      const user = await this.authService.login(this.email, this.password);
      if (!user) {
        console.error('Login failed. Invalid credentials.');
        return;
      }

      // Fetch user data from Firestore
      const userData = await this.authService.getUserData(user.uid);
      if (!userData) {
        console.error('User data not found in Firestore.');
        return;
      }

      console.log('User data:', userData);

      // Navigate based on user role
      const userRole = userData['role'];
      if (userRole === 'admin') {
        this.router.navigate(['/add-movies']);
      } else if (userRole === 'user') {
        this.router.navigate(['/home']);
      } else {
        console.error('Unauthorized role:', userRole);
        // Optionally redirect to a default or error page
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }
}
