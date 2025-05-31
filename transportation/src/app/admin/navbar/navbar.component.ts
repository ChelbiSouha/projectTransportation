import { Component, OnInit, HostListener} from '@angular/core';
import { AuthService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification.model';


@Component({
selector: 'app-navbar',
templateUrl: './navbar.component.html',
styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

showRegisterAdmin = false;
notifications: Notification[] = [];
showNotificationsPanel = false;

constructor(
private authService: AuthService,
private router: Router,
private notificationService: NotificationService
) {}

ngOnInit(): void {
this.loadNotifications();
}

loadNotifications(): void {
// Adjust this method to load admin-specific notifications if needed
this.notificationService.getNotifications().subscribe({
next: (data: Notification[]) => {
this.notifications = data;
},
error: (err: any) => console.error('Error loading notifications', err)
});
}

toggleNotifications(): void {
this.showNotificationsPanel = !this.showNotificationsPanel;
}

markAsRead(notificationId?: number): void {
if (!notificationId) return;
this.notificationService.markAsRead(notificationId).subscribe({
next: () => {
const notif = this.notifications.find(n => n.id === notificationId);
if (notif) notif.read = true;
},
error: (err: any) => console.error('Failed to mark notification as read', err)
});
}

logout(): void {
this.authService.logout();
this.router.navigate(['/login']);
}
@HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.nav-item.dropdown');
    if (!clickedInside && this.showNotificationsPanel) {
      this.showNotificationsPanel = false;
    }
  }
get unreadNotificationsCount(): number {
  if (!this.notifications) return 0;
  return this.notifications.filter(n => !n.read).length;
}

get hasUnreadNotifications(): boolean {
  return this.unreadNotificationsCount > 0;
}

}
