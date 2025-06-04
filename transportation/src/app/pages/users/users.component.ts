import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Shipment } from 'src/app/models/shipment.model';
import { AuthService } from 'src/app/services/auth-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: any;
  shipments: Shipment[] = [];
  notifications: Notification[] = [];
  showNotifications = false;
  activeShipmentsCount = 0;
  pastShipmentsCount = 0;
  pendingShipmentsCount = 0;
  selectedShipment: Shipment | null = null;

  constructor(
    private router: Router,
    private shipmentService: ShipmentService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.loadUserShipments(userId);
      this.loadUserNotifications(userId);
    }
  }

  loadUserShipments(userId: number): void {
    this.shipmentService.getShipmentsByUserId(userId).subscribe({
      next: (data: Shipment[]) => {
        this.shipments = data;
        console.log('Loaded shipments:', this.shipments);
        this.activeShipmentsCount = data.filter(s => s.status.toLowerCase() === 'Confirmed').length;
        this.pastShipmentsCount = data.filter(s => ['delivered', 'completed'].includes(s.status.toLowerCase())).length;
        this.pendingShipmentsCount = data.filter(s => s.status.toLowerCase() === 'pending').length;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des expéditions :', err);
      }
    });
  }

  loadUserNotifications(userId: number): void {
    this.notificationService.getNotifications().subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
      },
      error: (err) => console.error('Error loading notifications', err)
    });
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(notificationId?: number): void {
    if (!notificationId) return;
    this.notificationService.markAsRead(notificationId).subscribe({
      next: () => {
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) notif.read = true;
      },
      error: (err) => console.error('Failed to mark notification as read', err)
    });
  }

  viewShipmentDetails(id: number): void {
    console.log("View clicked for shipment ID:", id);
    const shipment = this.shipments.find(s => s.id === id);
    if (shipment) {
      this.selectedShipment = shipment;
    }
  }

  goToAvailableTransporters(id: number): void {
    console.log('Navigating to available transporters with ID:', id);
    this.router.navigate(['/home/available-transporters', id]);
  }


  closeModal(): void {
    this.selectedShipment = null;
  }

  logout(): void {
    this.authService.logout();
  }

  goToShipmentPage(): void {
    this.router.navigate(['/home/step1']);
  }

  trackShipment(): void {
    // Tu peux rediriger vers une page de suivi plus tard
    console.log('Track Shipment clicked');
  }
}
