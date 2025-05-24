export interface ShipmentRequest {
  id?: number;
  shipment: { id: number };
  transporter: { id: number };
  proposedPrice?: number;
  status?: string;
  createdAt?: Date;
}
