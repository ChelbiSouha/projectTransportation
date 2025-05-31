import { Component, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { TransporterService } from 'src/app/services/transporter.service';
import { AuthService } from 'src/app/services/auth-service.service';
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

  notifications = [
    { message: 'New shipment assigned.' },
    { message: 'Profile updated successfully.' }
  ];
  showNotifications = false;
  showProfile = false;
  activeSection = 'profile';

  constructor(
    private reviewService: ReviewService,
    private transporterService: TransporterService,
    private authService: AuthService
  ) {}

 transporterId: number | null = null;

 ngOnInit(): void {
   this.transporterId = this.authService.getCurrentUserId();

   if (this.transporterId === null) {
     console.error('Transporter ID not found');
     return;
   }

   this.transporterService.getTransporterById(this.transporterId).subscribe({
     next: (transporter) => {
       this.transporter = transporter;
       this.loadReviews();
     },
     error: (error) => console.error('Error loading transporter:', error)
   });
 }


  loadReviews(): void {
    if (this.transporterId === null) {
      console.error('Cannot load reviews: transporterId is null');
      return;
    }

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
