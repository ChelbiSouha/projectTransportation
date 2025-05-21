import { Component, OnInit } from '@angular/core';
import { ShipmentService } from 'src/app/services/shipment.service';
import { Shipment } from 'src/app/models/shipment.model';

@Component({
  selector: 'app-admin-shipments',
  templateUrl: './admin-shipments.component.html',
  styleUrls: ['./admin-shipments.component.css']
})
export class AdminShipmentsComponent implements OnInit {
  selectedStatus = '';
  shipments: Shipment[] = [];
  selectedShipment: Shipment | null = null;
  showEditForm = false;
  showDetails = false;

  constructor(private shipmentService: ShipmentService) {}

  ngOnInit(): void {
    this.loadShipments();
  }

  loadShipments() {
    this.shipmentService.getAllShipments().subscribe(data => {
      this.shipments = data;
    });
  }

  filteredShipments(): Shipment[] {
    if (!this.selectedStatus || this.selectedStatus.toLowerCase() === 'all') {
      return this.shipments;
    }

    return this.shipments.filter(
      s => s.status?.toLowerCase() === this.selectedStatus.toLowerCase()
    );
  }


  viewDetails(shipment: Shipment) {
    this.selectedShipment = shipment;
    this.showDetails = !this.showDetails;
    this.showEditForm = false;
  }

  editShipment(shipment: Shipment) {
    this.selectedShipment = { ...shipment };
    this.showEditForm = true;
    this.showDetails = false;
  }

  cancelEdit() {
    this.selectedShipment = null;
    this.showEditForm = false;
  }

  saveShipment() {
    if (this.selectedShipment?.id) {
      this.shipmentService.updateShipment(this.selectedShipment.id, this.selectedShipment).subscribe(() => {
        this.loadShipments();
        this.cancelEdit();
      });
    }
  }

  deleteShipment(id: number) {
    this.shipmentService.deleteShipment(id).subscribe(() => {
      this.loadShipments();
    });
  }
}
