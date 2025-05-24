import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShipmentRequest } from '../models/shipment-request.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShipmentRequestService {
  private apiUrl = `${environment.apiBaseUrl}/shipment-requests`;

  constructor(private http: HttpClient) {}

  sendRequest(request: ShipmentRequest): Observable<ShipmentRequest> {
    return this.http.post<ShipmentRequest>(`${this.apiUrl}/create`, request);
  }

  getRequestsByTransporter(transporterId: number): Observable<ShipmentRequest[]> {
    return this.http.get<ShipmentRequest[]>(`${this.apiUrl}/transporter/${transporterId}`);
  }

  getRequestsByShipment(shipmentId: number): Observable<ShipmentRequest[]> {
    return this.http.get<ShipmentRequest[]>(`${this.apiUrl}/shipment/${shipmentId}`);
  }


}
