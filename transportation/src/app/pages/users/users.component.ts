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
  loadUserNotifications(userId: number): void {
      this.notificationService.getNotifications().subscribe({
        next: (data: Notification[]) => {
          this.notifications = data;
        },
        error: (err) => console.error('Error loading notifications', err)
      });
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

  loadUserShipments(userId: number): void {
    this.shipmentService.getShipmentsByUserId(userId).subscribe({
      next: (data: Shipment[]) => {
        this.shipments = data;

        this.activeShipmentsCount = data.filter(s => s.status.toLowerCase() === 'active').length;
        this.pastShipmentsCount = data.filter(s => s.status.toLowerCase() === 'delivered' || s.status.toLowerCase() === 'completed').length;
        this.pendingShipmentsCount = data.filter(s => s.status.toLowerCase() === 'pending').length;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des expéditions :', err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  addShipment() {
    this.router.navigate(['/home/step1']);
  }

  trackShipment() {
    console.log('Track Shipment');
  }

 viewShipmentDetails(id: number): void {
   this.router.navigate(['/shipment', id]);
 }

 toggleNotifications(): void {
     this.showNotifications = !this.showNotifications;
   }
  goToShipmentPage(): void {
    this.router.navigate(['/home/shipment']);
  }
}
