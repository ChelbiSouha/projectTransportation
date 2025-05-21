import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  user = { name: 'John Doe' };
      activeShipmentsCount = 3;  // Example static data
      pastShipmentsCount = 2;    // Example static data
      pendingShipmentsCount = 1; // Example static data
      shipments = [              // Example static data
        { id: '1', pickupLocation: 'Tunis', dropoffLocation: 'Sousse', date: new Date(), status: 'Active' },
        { id: '2', pickupLocation: 'Ariana', dropoffLocation: 'Sfax', date: new Date(), status: 'Delivered' },
        { id: '3', pickupLocation: 'Nabeul', dropoffLocation: 'Djerba', date: new Date(), status: 'Pending' },
      ];

      constructor(private router: Router) {}

        ngOnInit(): void {
          // No need to load data from the service anymore
        }

        // These methods are placeholders for your buttons, and they can be empty for now
        logout() {
          console.log('Logout');
        }

        addShipment() {
          console.log('Add Shipment');
        }

        trackShipment() {
          console.log('Track Shipment');
        }

        viewShipmentDetails(id: string) {
          console.log(`Viewing details for shipment ${id}`);
        }
       goToShipmentPage(): void {
          // Redirect to the shipment page
          this.router.navigate(['/home/shipment']);
        }

}
