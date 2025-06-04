import { Component, OnInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

interface CarLocationUpdate {
  carId: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-shipment-tracking',
  templateUrl: './shipment-tracking.component.html',
  styleUrls: ['./shipment-tracking.component.css']
})
export class ShipmentTrackingComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private stompClient!: Client;
  private markers: Map<string, L.Marker> = new Map();

  ngOnInit(): void {
    this.initMap();
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.deactivate();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([34.0, 9.0], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private connectWebSocket(): void {
    const socket = new SockJS(`${environment.apiBaseUrl}/ws`);

    this.stompClient = new Client({
      webSocketFactory: () => socket as unknown as WebSocket,
      reconnectDelay: 5000,
    });

   this.stompClient.onConnect = (frame) => {
     console.log('WebSocket connected:', frame);
     this.stompClient.subscribe('/topic/car-location', (message: IMessage) => {
       console.log('Received message:', message.body);
       const location: CarLocationUpdate = JSON.parse(message.body);
       console.log('Parsed location:', location);
       this.updateMarker(location);
     });
   };
    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    this.stompClient.activate();
  }

 private updateMarker(location: CarLocationUpdate): void {
   const existingMarker = this.markers.get(location.carId);

   if (existingMarker) {
     existingMarker.setLatLng([location.latitude, location.longitude]);
   } else {
     const marker = L.marker([location.latitude, location.longitude])
       .addTo(this.map)
       .bindPopup(`Car: ${location.carId}`);
     this.markers.set(location.carId, marker);
   }
 }


}
