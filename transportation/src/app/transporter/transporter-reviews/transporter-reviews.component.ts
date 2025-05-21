import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-transporter-reviews',
  templateUrl: './transporter-reviews.component.html',
  styleUrls: ['./transporter-reviews.component.css']
})
export class TransporterReviewsComponent implements OnInit {
  transporter!: Transporter;
  reviews: Review[] = [];
  overallRating: number = 0;
  transporterId: number = 1; // 🔥 Tu peux le récupérer dynamiquement selon ton projet (par ex: depuis route params)
   notifications = [
      { message: 'New shipment assigned.' },
      { message: 'Profile updated successfully.' }
    ];
    showNotifications = false;
    showProfile = false;
    activeSection = 'profile';
  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
this.reviewService.getReviewsByTransporter(this.transporterId).subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
        this.calculateOverallRating();
      },
      error: (error: any) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  calculateOverallRating(): void {
    if (this.reviews.length === 0) {
      this.overallRating = 0;
      return;
    }
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.overallRating = parseFloat((total / this.reviews.length).toFixed(1));
  }
logout(): void {
  // Exemple simple : juste rediriger vers la page login
  localStorage.clear();
  window.location.href = '/login';
}
isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActive(section: string): void {
    this.activeSection = section;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }
}
