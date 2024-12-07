import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';  // Adjust the path based on your file structure
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

  async onLogin() {
    try {
      const user = await this.authService.login({ email: this.email, password: this.password });
      if (user) {
        console.log('Login successful:', user);
        this.router.navigate(['/home']);  // Navigate to a dashboard or home page after login
      } else {
        console.log('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      // Handle error messages (e.g., display an alert to the user)
    }
  }
}
