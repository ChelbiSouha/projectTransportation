import { Component,OnInit} from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  shipments: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.fetchShipments();
  }

  fetchShipments() {
    this.shipmentService.getAllShipments().subscribe(
      (data) => {
        this.shipments = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Failed to load shipments.';
        this.isLoading = false;
      }
    );
  }
selectedShipment: any = null;
 openModal(shipment: any) {
    this.selectedShipment = shipment;
  }

  closeModal() {
    this.selectedShipment = null;
  }
}
