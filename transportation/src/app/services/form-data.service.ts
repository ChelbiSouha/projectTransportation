import { Injectable } from '@angular/core';
import { Shipment } from '../models/shipment.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private shipmentData: Shipment = {} as Shipment;

  setShipmentData(data: Partial<Shipment>): void {
    this.shipmentData = { ...this.shipmentData, ...data };
  }

  getShipmentData(): Shipment {
    return this.shipmentData;
  }

  resetShipmentData(): void {
    this.shipmentData = {} as Shipment;
  }
}
