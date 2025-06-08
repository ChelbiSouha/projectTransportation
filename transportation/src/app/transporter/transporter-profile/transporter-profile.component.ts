import { Component, OnInit } from '@angular/core';
import { TransporterService } from 'src/app/services/transporter.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Transporter } from 'src/app/models/transporter.model';
import { NotificationService } from '../../services/notification.service';  // <-- added import

@Component({
  selector: 'app-transporter-profile',
  templateUrl: './transporter-profile.component.html',
  styleUrls: ['./transporter-profile.component.css']
})
export class TransporterProfileComponent implements OnInit {

  transporter!: Transporter;
  notifications: any[] = [];
  showNotifications = false;
  showProfile = false;
  activeSection = 'profile';
  vehicleInfo = { type: '', plate: '' };

  constructor(
    private transporterService: TransporterService,
    private authService: AuthService,
    private notificationService: NotificationService  // <-- injected here
  ) {}

  ngOnInit(): void {
    const transporterId = this.authService.getCurrentUserId();
    if (!transporterId) {
      console.error('Transporter ID not found, cannot load profile');
      return;
    }
    this.transporterService.getTransporterById(transporterId).subscribe({
      next: (transporter) => {
        this.transporter = transporter;
        this.vehicleInfo.type = transporter.vehicleType || '';
        this.vehicleInfo.plate = transporter.plateNumber || '';
        if (!this.transporter.phone) {
          this.transporter.phone = ''; // Initialize if missing
        }
        this.loadNotifications();
      },
      error: (err) => console.error('Error loading transporter profile', err)
    });
  }

  loadNotifications(): void {
    if (!this.transporter?.id) return;
    this.notificationService.getNotifications().subscribe(data => {
      this.notifications = data.filter(n => n.userId === this.transporter.id);
    });
  }

  updateProfile(): void {
    if (!this.transporter?.id) {
      console.error('Transporter ID is missing!');
      return;
    }
    this.transporter.vehicleType = this.vehicleInfo.type;
    this.transporter.plateNumber = this.vehicleInfo.plate;

    console.log('Updating transporter:', this.transporter);

    this.transporterService.updateTransporter(this.transporter.id, this.transporter).subscribe({
      next: (updatedTransporter) => {
        this.transporter = updatedTransporter;
        this.vehicleInfo.type = updatedTransporter.vehicleType || '';
        this.vehicleInfo.plate = updatedTransporter.plateNumber || '';
        alert('Profile updated successfully!');
      },
      error: (err) => {
        console.error('Error updating transporter profile', err);
        alert('Failed to update profile.');
      }
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

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActive(section: string): void {
    this.activeSection = section;
  }

  logout(): void {
    alert('You have been logged out.');
    this.authService.logout();
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
    }
  }
}
