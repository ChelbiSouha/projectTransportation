import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-transporter',
  templateUrl: './login-transporter.component.html',
  styleUrls: ['./login-transporter.component.css']
})
export class LoginTransporterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        alert('Login successful!');
        this.router.navigate(['/dashboard-transporter']);
      },
      error: (err) => {
        console.error(err);
        alert('Login failed: ' + (err.error || 'Unknown error'));
      }
    });
  }
}
