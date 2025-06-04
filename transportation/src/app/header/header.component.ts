import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.currentUser.subscribe(user => {
      this.isLoggedIn = !!user && !!user.token;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  scrollToSection(sectionId: string): void {
      if (this.router.url === '/home/acceuil' || this.router.url.startsWith('/#')) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        this.router.navigate(['/home/acceuil']).then(() => {
          setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 300); // délai pour laisser le temps à la page de charger
        });
      }

}

}
