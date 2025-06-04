import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['expired']) {
        this.error = 'Your session has expired. Please log in again.';
      }
    });
  }

  login() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const user = this.authService.getCurrentUser();
        if (user.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (user.role === 'TRANSPORTER') {
          this.router.navigate(['/dashboard-transporter']);
        } else {
          this.router.navigate(['/home/users']);
        }
      },
      error: (error: any) => {
        this.error = 'Login failed. Please try again!';
        this.loading = false;
      }
    });
  }
}
