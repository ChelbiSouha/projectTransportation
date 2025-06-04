import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { ReviewService } from 'src/app/services/review.service';
import { Shipment } from 'src/app/models/shipment.model';
import { Review } from 'src/app/models/review.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { ReviewRequest } from 'src/app/models/review-request.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  hovered = 0;
  reviewForm: FormGroup;
  constructor(
      private shipmentService: ShipmentService,
      private reviewService: ReviewService,
      private authService: AuthService,
      private router: Router,
      private fb: FormBuilder // ✅ Ajouté
    ) {
      this.reviewForm = this.fb.group({
        rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
        comment: ['', Validators.required]
      });
    }


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


setRating(rating: number): void {
  this.reviewForm.get('rating')?.setValue(rating);
  this.reviewForm.get('rating')?.markAsTouched();
}

  selectShipment(shipment: Shipment) {
    this.selectedShipment = shipment;
  }
  submitReview() {
    if (!this.selectedShipment || !this.reviewForm.valid) return;

    this.submitting = true;

    const userId = this.authService.currentUserValue?.id;
    const transporterId = this.selectedShipment.confirmedTransporter?.id;

    if (!userId || !transporterId) {
      alert('Missing user or transporter info.');
      this.submitting = false;
      return;
    }

    const newReviewRequest: ReviewRequest = {
      rating: this.reviewForm.value.rating,
      comment: this.reviewForm.value.comment,
      transporterId,
      shipmentId: this.selectedShipment.id
    };
     console.log('Current user (from token):', this.authService.currentUserValue);
     console.log('ReviewRequest:', newReviewRequest);

    this.reviewService.addReview(newReviewRequest).subscribe({
      next: () => {
        alert('Review submitted successfully!');
        // Retirer l’expédition localement
        this.shipments = this.shipments.filter(s => s.id !== this.selectedShipment?.id);
        this.selectedShipment = undefined;
        this.reviewForm.reset({ rating: 0, comment: '' });
      },
      error: (err) => {
        console.error('Error submitting review:', err);
        alert('Failed to submit review: ' + (err?.error?.message || 'Unknown error'));
      },
      complete: () => {
        this.submitting = false;
      }
    });
  }



}
