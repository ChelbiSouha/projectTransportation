import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service'; // ✅ import this service

@Component({
  selector: 'app-shipment-step3',
  templateUrl: './shipment-step3.component.html',
  styleUrls: ['./shipment-step3.component.css']
})
export class ShipmentStep3Component implements OnInit {
  form: FormGroup;
  steps = [
    { label: 'Pickup' },
    { label: 'Details' },
    { label: 'Confirm' }
  ];
  currentStep = 2;

  shipmentSummary: any = null;
  estimatedPrice: number = 0;

  constructor(
    private fb: FormBuilder,
    private shipmentService: ShipmentService,
    private formDataService: FormDataService, // ✅ inject FormDataService
    private router: Router
  ) {
    this.form = this.fb.group({
      customQuote: [null]
    });
  }

  ngOnInit(): void {
    this.shipmentSummary = this.formDataService.getShipmentData();

    if (!this.shipmentSummary) {
      // Optional: redirect if no data available (user landed here directly)
      this.router.navigate(['/home/step1']);
      return;
    }

    this.calculateEstimatedPrice();
  }

  calculateEstimatedPrice() {
    const distance = parseFloat(this.shipmentSummary.distance) || 0;
    const weight = parseFloat(this.shipmentSummary.weight) || 0;
    this.estimatedPrice = (distance * 1.0) + (weight * 0.2);
  }

  onConfirm() {
    console.log('Confirm and Publish clicked');
    const quote = this.form.value.customQuote || this.estimatedPrice;

    const shipment = {
      ...this.shipmentSummary,
      proposedPrice: quote,
      status: 'Pending'
    };
    console.log('Sending to backend:', shipment);
    this.shipmentService.addShipment(shipment).subscribe(
      (response) => {
        console.log('Shipment published successfully:', response);
        this.formDataService.resetShipmentData(); // ✅ correct method name
        this.router.navigate(['/home/list']);
      },
      (error) => {
        console.error('Error publishing shipment:', error);
      }
    );
  }
}
