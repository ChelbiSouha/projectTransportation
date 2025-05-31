import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest, Role } from '../../models/register-request.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: Role = Role.CLIENT;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const registerData: RegisterRequest = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

   this.http.post('http://localhost:8080/myapp/auth/register', registerData, { responseType: 'text' }).subscribe({
     next: (response) => {
       alert(response); // Affiche "User registered successfully"
     },
     error: (error) => {
       console.error('Registration error:', error);
       alert('Registration failed');
     }


    });
  }
}
