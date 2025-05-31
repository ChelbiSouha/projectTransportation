import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../../models/register-request.model';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent {
  adminData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private http: HttpClient) {}

  registerAdmin() {
    const registerData = {
      ...this.adminData,
      role: Role.ADMIN // assign admin role automatically
    };

    this.http.post('http://localhost:8080/myapp/auth/register', registerData, { responseType: 'text' }).subscribe({
      next: (res) => {
        alert(res);
        this.adminData = { username: '', email: '', password: '' }; // reset form
      },
      error: (err) => {
        alert('Registration failed');
        console.error(err);
      }
    });
  }
}
