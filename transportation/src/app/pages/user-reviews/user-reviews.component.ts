import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { ReviewService } from 'src/app/services/review.service';
import { Shipment } from 'src/app/models/shipment.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  shipments: Shipment[] = [];
  review: Review = {
    rating: 0,
    comment: '',
    date: '',
    user: {} as any,
    transporter: {} as any,
    shipment: {} as any
  };
  selectedShipment?: Shipment;
  submitting = false;

  constructor(
    private shipmentService: ShipmentService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.currentUserValue?.id ?? null;

    if (userId !== null) {
      this.shipmentService.getShipmentsByUserId(userId).subscribe(data => {
        this.shipments = data.filter(s =>
          s.status === 'COMPLETED' && !(s as any).reviewGiven // simuler si champ non existant
        );
      });
    } else {
      console.error('User ID is null – impossible to fetch shipments');
    }
  }

  selectShipment(shipment: Shipment) {
    this.selectedShipment = shipment;
  }

  submitReview() {
    if (!this.selectedShipment) return;

    this.submitting = true;
    const user = this.authService.currentUserValue;
    const today = new Date().toISOString();

    const newReview: Review = {
      rating: this.review.rating,
      comment: this.review.comment,
      user: user,
      transporter: this.selectedShipment.confirmedTransporter!,
      shipment: this.selectedShipment
    };
    console.log('Review envoyée:', newReview);
    this.reviewService.addReview(newReview).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Failed to submit review: ' + (err?.error?.message || 'Unknown error'));
      },
      complete: () => (this.submitting = false)
    });
  }
}
