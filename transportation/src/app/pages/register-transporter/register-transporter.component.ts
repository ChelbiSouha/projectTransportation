import { Component } from '@angular/core';
import { TransporterService } from '../../services/transporter.service';

@Component({
  selector: 'app-register-transporter',
  templateUrl: './register-transporter.component.html',
  styleUrls: ['./register-transporter.component.css']
})
export class RegisterTransporterComponent {

  transporter = {
    username: '',
    email: '',
    password: '',
    phone: '',
    vehicleType: '',
    plateNumber: '',
    licenseImage: null as File | null,
    vehicleRegistrationImage: null as File | null
  };

  constructor(private transporterService: TransporterService) {}

  onFileSelected(event: any, type: string) {
    const file: File = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) { // 2 Mo
      alert('File size must be less than 2MB');
      return;
    }

    if (type === 'license') {
      this.transporter.licenseImage = file;
    } else if (type === 'vehicleRegistration') {
      this.transporter.vehicleRegistrationImage = file;
    }
  }

  isLoading = false;

  registerTransporter() {
    if (
      !this.transporter.username ||
      !this.transporter.email ||
      !this.transporter.password ||
      !this.transporter.phone ||
      !this.transporter.vehicleType ||
      !this.transporter.plateNumber ||
      !this.transporter.licenseImage ||
      !this.transporter.vehicleRegistrationImage
    ) {
      alert('Please fill all fields and upload all required documents.');
      return;
    }

    this.isLoading = true;

    // Construction du FormData
    const formData = new FormData();
    formData.append('username', this.transporter.username);
    formData.append('email', this.transporter.email);
    formData.append('password', this.transporter.password);
    formData.append('phone', this.transporter.phone);
    formData.append('vehicleType', this.transporter.vehicleType);
    formData.append('plateNumber', this.transporter.plateNumber);
    formData.append('licenseImage', this.transporter.licenseImage as File);
    formData.append('vehicleRegistrationImage', this.transporter.vehicleRegistrationImage as File);

    this.transporterService.registerTransporter(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        alert('Registration successful! Awaiting admin approval.');
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        alert('Registration failed: ' + (err.error?.message || JSON.stringify(err.error)));
      }
    });
  }

}
