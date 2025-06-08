import { Component, AfterViewInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent {

  constructor(private locationService: LocationService, private http: HttpClient) {}
  ngAfterViewInit(): void {
      this.loadMap();
    }
  sendLocation() {
    this.locationService.getCurrentLocation()
      .then(position => {
        const payload = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: new Date().toISOString()
        };

        this.http.post('/updateLocation', payload).subscribe({
          next: res => console.log('✅ Location sent!', res),
          error: err => console.error('❌ Error sending location', err)
        });
      })
      .catch(err => {
        console.error('❌ Unable to get location', err);
      });
  }
loadMap(): void {
    this.locationService.getCurrentLocation()
      .then(position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const map = L.map('map').setView([lat, lng], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`You are here: [${lat.toFixed(5)}, ${lng.toFixed(5)}]`)
          .openPopup();
      })
      .catch(err => {
        console.error('Could not load map:', err);
      });
  }
}
