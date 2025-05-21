import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transporter-dashboard',
  templateUrl: './transporter-dashboard.component.html',
  styleUrls: ['./transporter-dashboard.component.css']
})
export class TransporterDashboardComponent implements OnInit {
  transporter = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  activeShipments = 5;
  pendingShipments = 3;
  reviews = 15;
  earnings = '$1200';

  latestFeedback = {
    userName: 'Alice',
    comment: 'Great service! Will definitely use again.',
    rating: 5
  };

  notifications = [
    { title: 'New Shipment Request', message: 'You have a new shipment request for delivery.' },
    { title: 'Update on Pending Shipment', message: 'Your shipment is now in progress.' }
  ];

  showNotifications = false;
  showProfile = false;

  // Declare the activeRoute property
  activeRoute: string = 'dashboard';  // Default route can be set to 'dashboard'

  constructor() { }

  ngOnInit(): void {
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }

  setActive(route: string): void {
    this.activeRoute = route;  // Set the active route
  }

  // Check if the route is active
  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  logout(): void {
    window.location.href = '/home'; // Navigate to the home page
  }
}
