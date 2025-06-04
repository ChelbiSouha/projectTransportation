import { Component, OnInit } from '@angular/core';
import { ShipmentRequestService } from 'src/app/services/shipment-request.service';
import { ShipmentService } from 'src/app/services/shipment.service';
import { ShipmentRequest } from 'src/app/models/shipment-request.model';
import { Transporter } from 'src/app/models/transporter.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-transporters',
  templateUrl: './available-transporters.component.html',
  styleUrls: ['./available-transporters.component.css']
})
export class AvailableTransportersComponent implements OnInit {
  shipmentRequests: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private shipmentRequestService: ShipmentRequestService,
    private shipmentService: ShipmentService,
    private route: ActivatedRoute
  ) {}

  shipmentId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.shipmentId = +idParam;
        this.loadShipmentRequests();
      } else {
        this.errorMessage = 'Aucun ID d\'expédition fourni.';
      }
    });
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
