import { Shipment } from './shipment.model';
import { Transporter } from './transporter.model';

export interface Quote {
  id?: number;
  estimatedPrice: number;
  date: string;
  clientApproved?: boolean;
  transporterApproved?: boolean;
  shipment: Shipment;
  transporter: Transporter | null;  // Allow null
}

