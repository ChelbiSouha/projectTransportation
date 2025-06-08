import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Shipment } from 'src/app/models/shipment.model';
import { TransporterService } from 'src/app/services/transporter.service';
import { ReviewService } from 'src/app/services/review.service';
import { LocationService } from '../../services/location.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../services/notification.service';

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
  activeSection: string = 'dashboard';

  constructor(
    private transporterService: TransporterService,
    private shipmentService: ShipmentService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private locationService: LocationService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.transporterService.getTransporterById(userId).subscribe(transporter => {
      this.transporter = transporter;
      this.transporterId = transporter.id;
      this.loadDashboardData(this.transporterId);
      this.loadNotifications();
    });
  }

  loadDashboardData(transporterId: number): void {
    this.shipmentService.getAllShipments().subscribe(shipments => {
      const transporterShipments = shipments.filter(s => s.confirmedTransporter?.id === transporterId);

      this.completedShipments = transporterShipments.filter(s => s.status.toLowerCase() === 'completed');

      this.activeShipments = transporterShipments.filter(s =>
        ['confirmed', 'in-progress'].includes(s.status.toLowerCase())
      ).length;

      this.pendingShipments = transporterShipments.filter(s => s.status.toLowerCase() === 'pending').length;

      this.earnings = transporterShipments.reduce((sum, s) => sum + (s.proposedPrice || 0), 0);
    });

    this.reviewService.getReviewsByTransporter(transporterId).subscribe(reviews => {
      this.reviews = reviews.length;
      this.latestFeedback = reviews.length > 0 ? reviews[reviews.length - 1] : null;
    });
  }

  loadNotifications(): void {
    if (!this.transporterId) return;

    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data.filter(n => n.userId === this.transporterId);
    });
  }

  getUnreadCount(): number {
    return this.notifications?.filter(n => !n.read).length || 0;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
    this.showProfile = false;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
    this.showNotifications = false;
  }

  setActive(section: string): void {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  logout(): void {
    alert('You have been logged out.');
    this.authService.logout();
  }

  sendLocation() {
    this.locationService.getCurrentLocation()
      .then(position => {
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        };

        this.http.post('/updateLocation', payload).subscribe({
          next: res => console.log('✅ Location sent!', res),
          error: err => console.error('❌ Error sending location', err)
        });
      })
      .catch(err => {
        console.error('❌ Unable to get location', err);
      });
  }
}
