import { Component, OnInit } from '@angular/core';
import { ShipmentRequestService } from 'src/app/services/shipment-request.service';
import { ShipmentService } from 'src/app/services/shipment.service';
import { ShipmentRequest } from 'src/app/models/shipment-request.model'; // si tu en as un
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-available-transporters',
  templateUrl: './available-transporters.component.html',
  styleUrls: ['./available-transporters.component.css']
})
export class AvailableTransportersComponent implements OnInit {

  shipmentId = 3; // TODO: Dynamiser dans le vrai projet
  shipmentRequests: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private shipmentRequestService: ShipmentRequestService,
    private shipmentService: ShipmentService
  ) {}

  ngOnInit(): void {
    this.loadShipmentRequests();
  }

  loadShipmentRequests(): void {
    this.loading = true;
    this.shipmentRequestService.getRequestsByShipment(this.shipmentId).subscribe({
      next: (requests) => {
        this.shipmentRequests = requests;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des demandes', err);
        this.errorMessage = 'Erreur lors du chargement des demandes.';
        this.loading = false;
      }
    });
  }

  confirmTransporter(transporterId: number): void {
    if (!confirm('Confirmer ce transporteur pour votre expédition ?')) return;

    this.shipmentService.confirmTransporter(this.shipmentId, transporterId).subscribe({
      next: () => {
        alert('Transporteur confirmé avec succès !');
        this.loadShipmentRequests(); // Mise à jour après confirmation
      },
      error: (err) => {
        console.error('Erreur confirmation transporteur', err);
        alert('Erreur lors de la confirmation du transporteur.');
      }
    });
  }
}
