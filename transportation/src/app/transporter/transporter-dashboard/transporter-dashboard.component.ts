import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Shipment } from 'src/app/models/shipment.model';
import { TransporterService } from 'src/app/services/transporter.service';
import { ReviewService } from 'src/app/services/review.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-transporter-dashboard',
  templateUrl: './transporter-dashboard.component.html',
  styleUrls: ['./transporter-dashboard.component.css']
})
export class TransporterDashboardComponent implements OnInit {
  latitude: number = 36.8065; // Tunis by default
  longitude: number = 10.1815;
  map!: L.Map;

  options: L.MapOptions;

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
  activeSection: string = 'dashboard';  // default active section

  constructor(
    private transporterService: TransporterService,
    private shipmentService: ShipmentService,
    private reviewService: ReviewService,
    private webSocketService: WebSocketService,
    private authService: AuthService
  ) {
    this.options = {
      center: L.latLng(this.latitude, this.longitude),
      zoom: 12,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        })
      ]
    };
  }

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return;

    this.transporterService.getTransporterById(userId).subscribe(transporter => {
      this.transporter = transporter;
      this.transporterId = transporter.id;
      this.loadDashboardData(this.transporterId);
    });

    this.webSocketService.subscribeToCarLocation((location) => {
      if (location.carId === this.transporter?.plateNumber) {
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.recenterMap();
      }
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

  onMapReady(map: L.Map): void {
    this.map = map;
  }

  recenterMap(): void {
    if (this.map) {
      this.map.setView([this.latitude, this.longitude], this.map.getZoom());
    }
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
    this.authService.logout();
  }

  updateLocation(): void {
    const payload = {
      latitude: this.latitude,
      longitude: this.longitude
    };

    this.transporterService.updateLocation(payload).subscribe({
      next: () => alert('Location updated successfully.'),
      error: err => {
        console.error('Error updating location:', err);
        alert('Failed to update location.');
      }
    });
  }

  onMapClick(event: L.LeafletMouseEvent): void {
    this.latitude = event.latlng.lat;
    this.longitude = event.latlng.lng;
    this.recenterMap();
  }
}
