import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-transporters',
  templateUrl: './available-transporters.component.html',
  styleUrls: ['./available-transporters.component.css']
})
export class AvailableTransportersComponent implements OnInit {

  // Example shipment details
  shipment = {
    pickupLocation: 'Tunis',
    dropoffLocation: 'Sfax',
    cargoType: 'Electronics'
  };

  // List of transporters (this would normally come from an API)
  transporters = [
    {
      id: 1,
      name: 'Ali Transport',
      vehicleType: 'Truck',
      available: true,
      imageUrl: '/assets/images/1.jpg',
      totalReviews: 45,
      rating: 4.6,
      quotePrice: 200,
            estimatedTime: 3,
            additionalFees: 20,
            otherDetails: 'Insurance included',
            showQuoteDetails: false
    },
    {
      id: 2,
      name: 'Khaled Logistics',
      vehicleType: 'Van',
      available: false,
      imageUrl: '/assets/images/2.jpg',
      totalReviews: 12,
      rating: 3.9,
      quotePrice: 200,
            estimatedTime: 3,
            additionalFees: 20,
            otherDetails: 'Insurance included',
            showQuoteDetails: false
    },
    {
      id: 3,
      name: 'Samir Express',
      vehicleType: 'Truck',
      available: true,
      imageUrl: '/assets/images/3.jpg',
      totalReviews: 88,
      rating: 4.9,
      quotePrice: 200,
                  estimatedTime: 3,
                  additionalFees: 20,
                  otherDetails: 'Insurance included',
                  showQuoteDetails: false

    },
  ];


  constructor() { }

  ngOnInit(): void {
    // Fetch the transporters based on the shipment details (mock data for now)
  }

  selectTransporter(transporter: any): void {
    console.log('Selected Transporter:', transporter);
    // You can handle the transporter selection here, for example, navigating to the shipment confirmation page
  }
 toggleQuoteDetails(id: number): void {
    const transporter = this.transporters.find(t => t.id === id);
    if (transporter) {
      transporter.showQuoteDetails = !transporter.showQuoteDetails;
    }
  }
}
