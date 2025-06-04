import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onFindTransporter(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home/step1']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
