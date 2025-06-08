import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';
import { Shipment } from '../../models/shipment.model';
import { AuthService } from '../../services/auth-service.service';
import { NotificationService } from '../../services/notification.service';
import { Notification } from '../../models/notification.model';
import { TransporterService } from '../../services/transporter.service';
import { Transporter } from '../../models/transporter.model';

@Component({
  selector: 'app-transporter-shipments',
  templateUrl: './transporter-shipments.component.html',
})
export class TransporterShipmentsComponent implements OnInit {
  transporterId!: number;
  shipments: Shipment[] = [];
  notifications: Notification[] = [];
  showNotifications = false;
  showProfile = false;
  activeSection: string = 'activeShipments';
  transporter!: Transporter;

  constructor(
    private shipmentService: ShipmentService,
    private authService: AuthService,
    private transporterService: TransporterService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.transporterId = userId;

      // Charger les détails du transporteur
      this.transporterService.getTransporterById(this.transporterId).subscribe({
        next: (data) => {
          this.transporter = data;
        },
        error: (err) => {
          console.error('Failed to load transporter info', err);
        }
      });

      this.loadConfirmedShipments();
      this.loadNotifications();
    }
  }
getUnreadCount(): number {
  return this.notifications?.filter(n => !n.read).length || 0;
}

  loadConfirmedShipments() {
    this.shipmentService.getConfirmedShipmentsForTransporter(this.transporterId).subscribe((data) => {
      this.shipments = data.filter(s => s.status === 'Confirmed');
    });
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe((data) => {
      this.notifications = data.filter(n => n.userId === this.transporterId);
    });
  }

  markAsCompleted(shipmentId: number) {
    this.shipmentService.markShipmentAsCompleted(shipmentId).subscribe(() => {
      const shipment = this.shipments.find(s => s.id === shipmentId);
      if (shipment) shipment.status = 'completed';
    });
  }

  markNotificationAsRead(notificationId: number) {
    this.notificationService.markAsRead(notificationId).subscribe(() => {
      const notif = this.notifications.find(n => n.id === notificationId);
      if (notif) notif.read = true;
    });
  }

  setActive(section: string) {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  logout() {
    alert('You have been logged out.');
    this.authService.logout();
  }
}
