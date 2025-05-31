import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Shipment } from 'src/app/models/shipment.model';
import { TransporterService } from 'src/app/services/transporter.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-transporter-dashboard',
  templateUrl: './transporter-dashboard.component.html',
  styleUrls: ['./transporter-dashboard.component.css']
})
export class TransporterDashboardComponent implements OnInit {
  completedShipments: Shipment[] = [];
  transporterId: number | null = null;
  transporter: any;
  activeShipments = 0;
  pendingShipments = 0;
  reviews = 0;
  earnings = 0;
  latestFeedback: any = null;
  notifications: any[] = [];

  showNotifications = false;
  showProfile = false;
  activeSection: string = 'dashboard';  // Default active section

  setActive(section: string): void {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
  constructor(
    private transporterService: TransporterService,
    private shipmentService: ShipmentService,
    private reviewService: ReviewService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.transporterService.getTransporterById(userId).subscribe(transporter => {
      this.transporter = transporter;
      console.log('Transporter reçu:', transporter);
      this.transporterId = transporter.id;
      this.loadDashboardData(this.transporterId);
      this.loadCompletedShipments(this.transporterId);
    });
  }

  loadCompletedShipments(transporterId: number): void {
    this.shipmentService.getAllShipments().subscribe(shipments => {
      this.completedShipments = shipments.filter(
        s => s.status === 'completed' && s.confirmedTransporter?.id === transporterId
      );
    });
  }

  loadDashboardData(transporterId: number): void {
    this.shipmentService.getAllShipments().subscribe(shipments => {
      const transporterShipments = shipments.filter(s => s.confirmedTransporter?.id === transporterId);

      this.activeShipments = transporterShipments.filter(s => s.status === 'confirmed' || s.status === 'in-progress').length;
      this.pendingShipments = transporterShipments.filter(s => s.status === 'pending').length;
      this.earnings = transporterShipments.reduce((sum, s) => sum + (s.proposedPrice || 0), 0);
    });

    this.reviewService.getReviewsByTransporter(transporterId).subscribe(reviews => {
      this.reviews = reviews.length;
      this.latestFeedback = reviews.length > 0 ? reviews[reviews.length - 1] : null;
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    this.showNotifications = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
