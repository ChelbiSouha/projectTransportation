import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transporter-shipments',
  templateUrl: './transporter-shipments.component.html',
})
export class TransporterShipmentsComponent implements OnInit {
  transporter = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  shipments = [
    {
      id: 1,
      title: 'Furniture Delivery',
      pickupLocation: 'Tunis',
      dropoffLocation: 'Sousse',
      status: 'pending',
      suggestedPrice: 40,
      proposedPrice: 40,
      showPropose: false
    },
    {
      id: 2,
      title: 'Electronics Transfer',
      pickupLocation: 'Sfax',
      dropoffLocation: 'Gabes',
      status: 'in-progress',
      suggestedPrice: 55,
      proposedPrice: 55,
      showPropose: false
    },
  ];


  notifications = [
    { title: 'New Shipment', message: 'You have a new pending shipment.' },
    { title: 'Reminder', message: 'Don’t forget to update your availability.' },

  ];

  showNotifications = false;
  showProfile = false;
  activeSection: string = 'activeShipments';

  ngOnInit(): void {}

  acceptShipment(id: number) {
    const shipment = this.shipments.find(s => s.id === id);
    if (shipment) shipment.status = 'accepted';
  }

  rejectShipment(id: number) {
    this.shipments = this.shipments.filter(s => s.id !== id);
  }

  trackShipment(id: number) {
    const shipment = this.shipments.find(s => s.id === id);
    if (shipment) {
      alert(`Tracking shipment: ${shipment.title}\nStatus: ${shipment.status}`);
    }
  }
  submitQuote(shipment: any) {
      alert(`Quote of ${shipment.proposedPrice} TND submitted for "${shipment.title}".`);
      shipment.showPropose = false;
      // Here you could also call a backend API to save this quote
    }
  setActive(section: string) {
    this.activeSection = section;
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  logout() {
    alert('You have been logged out.');
    // Tu peux aussi utiliser le router ici pour rediriger vers la page login
  }
}
