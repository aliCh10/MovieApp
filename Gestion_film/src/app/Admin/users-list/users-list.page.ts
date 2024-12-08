import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/users';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  users: User[] = []; 
  apiUrl = 'http://localhost:3000';  // L'URL de base de votre backend

  constructor(private http: HttpClient, private authService: AuthService ) { }


  ngOnInit() {
    this.getAllUsers();

  }
  async getAllUsers() {
    try {
      const users = await this.authService.getAllUsers();
      console.log('Users:', users);
      users.forEach(user => {
        user.photoURL = `${this.apiUrl}${user.photoURL}`;  // Préfixez l'URL avec l'URL de l'API backend

        console.log('Username:', user.username);
      });
      this.users = users;
        } catch (error) {
      console.error('Error fetching users:', error);
    }
  }
  async toggleBlock(user: any) {
    try {
      // Toggle block status
      user.isBlocked = !user.isBlocked;
      await this.authService.updateUserStatus(user.id, user.isBlocked);
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  }
  

}
