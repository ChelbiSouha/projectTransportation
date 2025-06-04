import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { FormDataService } from '../../services/form-data.service';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-shipment-step1',
  templateUrl: './shipment-step1.component.html',
  styleUrls: ['./shipment-step1.component.css']
})
export class ShipmentStep1Component {
  form: FormGroup;
  imagePreviews: string[] = [];
  @Input() currentStep = 0;

  steps = [
    { label: 'Details' },
    { label: 'Locations' },
    { label: 'Confirmation' }
  ];

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private formDataService: FormDataService,
    private authService: AuthService,
    private uploadService: UploadService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: [''],
      type: ['', Validators.required],
      weight: ['', Validators.required],
      receiverPhone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      description: ['', Validators.required],
      images: [[], Validators.required]
    });
  }

  onImageChange(event: any) {
    const fileList: FileList = event.target.files;
    const files: File[] = Array.from(fileList).slice(0, 7);

    this.imagePreviews = [];
    const uploadedUrls: string[] = [];

    if (files.length > 0) {
      this.uploadService.uploadMultiple(files).subscribe({
        next: (urls: any) => {
          this.form.get('images')?.setValue(urls);
          urls.forEach((url: string) => {
            this.imagePreviews.push(url);
          });
        },
        error: (err) => {
          console.error('Upload failed', err);
        }
      });
    }
  }


  onNext() {
    if (this.form.valid) {
      const userId = this.authService.getCurrentUserId();
          if (!userId) {
            console.error('User not authenticated');
            return;
          }
      const shipmentData = {
        ...this.form.value,
        pickupLocation: '',
        dropoffLocation: '',
        status: 'Pending',
        user: { id: userId } // Simulated user
      };
       shipmentData.weight = parseFloat(shipmentData.weight);
      this.formDataService.setShipmentData(shipmentData); // ✅ Save locally
      this.router.navigate(['/home/step2']); // ✅ Navigate to Step 2
    }
  else {
      console.log('Form is invalid. Errors:', this.form.errors);
      this.form.markAllAsTouched(); // ✅ Force display of validation errors
    }
  }
}
