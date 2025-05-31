import { Component, OnInit } from '@angular/core';
import { TransporterService } from 'src/app/services/transporter.service';
import { AuthService } from 'src/app/services/auth-service.service';
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-transporter-profile',
  templateUrl: './transporter-profile.component.html',
  styleUrls: ['./transporter-profile.component.css']
})
export class TransporterProfileComponent implements OnInit {

  transporter!: Transporter;
  notifications = [
    { message: 'New shipment assigned.' },
    { message: 'Profile updated successfully.' }
  ];
  showNotifications = false;
  showProfile = false;
  activeSection = 'profile';
  vehicleInfo = { type: '', plate: '' };

  constructor(
    private transporterService: TransporterService,
    private authService: AuthService
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
          this.transporter.phone = ''; // Initialiser si absent
        }
      },
      error: (err) => console.error('Error loading transporter profile', err)
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

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  setActive(section: string): void {
    this.activeSection = section;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
    }
  }
}
