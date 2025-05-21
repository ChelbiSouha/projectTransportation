import { Component, OnInit } from '@angular/core';
import { TransporterService } from 'src/app/services/transporter.service';
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-transporter-profile',
  templateUrl: './transporter-profile.component.html',
  styleUrls: ['./transporter-profile.component.css']
})
export class TransporterProfileComponent {

transporter!: Transporter;
  notifications = [
    { message: 'New shipment assigned.' },
    { message: 'Profile updated successfully.' }
  ];
  showNotifications = false;
  showProfile = false;
  activeSection = 'profile';
  vehicleInfo = { type: '', plate: '' };

  constructor(private transporterService: TransporterService) {}

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
    // Ta logique de déconnexion ici
    console.log('Logging out...');
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log('File selected:', file);
      // Tu peux ajouter ici comment tu veux uploader le fichier
    }
  }

  updateProfile(): void {
    if (this.transporter?.id) {
      this.transporterService.updateTransporter(this.transporter.id, this.transporter).subscribe({
        next: (updatedTransporter) => {
          this.transporter = updatedTransporter;
          alert('Profile updated successfully!');
        },
        error: (err) => {
          console.error('Error updating transporter profile', err);
          alert('Failed to update profile.');
        }
      });
    } else {
      console.error('Transporter ID is missing!');
    }
  }
}
