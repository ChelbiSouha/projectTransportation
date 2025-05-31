import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShipmentService } from '../../services/shipment.service';
import { QuoteService } from '../../services/quote.service';
import { Router } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';
 import { Quote } from '../../models/quote.model';

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
    private quoteService: QuoteService,
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
   const proposedPrice = this.form.value.customQuote || this.estimatedPrice;

   const shipment = {
     ...this.shipmentSummary,
     proposedPrice: proposedPrice,
     status: 'Pending'
   };

   this.shipmentService.addShipment(shipment).subscribe(
     (createdShipment) => {
       console.log('Shipment created:', createdShipment);

       const quote: Quote = {
         estimatedPrice: this.estimatedPrice,
         date: new Date().toISOString(),
         shipment: createdShipment,
         transporter: null  // transporter is null here
       };

       this.quoteService.addQuote(quote).subscribe(
         (createdQuote) => {
           console.log('Quote created:', createdQuote);
           this.formDataService.resetShipmentData();
           this.router.navigate(['/home/list']);
         },
         (error) => {
           console.error('Error creating quote:', error);
         }
       );
     },
     (error) => {
       console.error('Error creating shipment:', error);
     }
   );
 }


}
