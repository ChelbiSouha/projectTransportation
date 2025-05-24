import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';
import { ShipmentRequestService } from '../../services/shipment-request.service';
import { AuthService } from '../../services/auth-service.service';
import { ShipmentRequest } from '../../models/shipment-request.model';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  shipments: any[] = [];
  isLoading = true;
  error: string | null = null;

  selectedShipment: any = null;
  shipmentToPropose: any = null;
  proposedPrice: number = 0;
  proposalError: string | null = null;
  proposalSuccess: boolean = false;
  requestedShipmentIds: Set<number> = new Set();

  constructor(
    private shipmentService: ShipmentService,
    private shipmentRequestService: ShipmentRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchShipments();
    this.fetchSentRequests();
  }

  fetchShipments() {
    this.shipmentService.getAllShipments().subscribe(
      (data) => {
        this.shipments = data;
        this.isLoading = false;
      },
      (err: any) => {
        this.error = 'Failed to load shipments.';
        this.isLoading = false;
      }
    );
  }

  fetchSentRequests() {
    const transporterId = this.authService.getCurrentUserId();
    if (transporterId !== null) {
      this.shipmentRequestService.getRequestsByTransporter(transporterId).subscribe(
        (requests) => {
          for (let req of requests) {
            this.requestedShipmentIds.add(req.shipment.id); // ✅ corrigé ici
          }
        },
        (err: any) => {
          console.error('Failed to load shipment requests:', err);
        }
      );
    }
  }

  hasRequested(shipmentId: number): boolean {
    return this.requestedShipmentIds.has(shipmentId);
  }

  openModal(shipment: any) {
    this.selectedShipment = shipment;
  }

  closeModal() {
    this.selectedShipment = null;
  }

  openProposalModal(shipment: any) {
    this.shipmentToPropose = shipment;
    this.proposedPrice = 0;
    this.proposalError = null;
    this.proposalSuccess = false;
  }

  closeProposalModal() {
    this.shipmentToPropose = null;
  }

  acceptShipment(shipment: any) {
    const transporterId = this.authService.getCurrentUserId();
    if (transporterId !== null) {
      const request: ShipmentRequest = {
        shipment: { id: shipment.id },
        transporter: { id: transporterId },
        proposedPrice: shipment.proposedPrice,
        status: 'PENDING'
      };

      this.shipmentRequestService.sendRequest(request).subscribe(
        () => {
          this.requestedShipmentIds.add(shipment.id);
          alert('Request sent with proposed price.');
        },
        (err: any) => {
          alert('Failed to send request.');
          console.error(err);
        }
      );
    }
  }

  sendProposal() {
    if (this.proposedPrice <= 0) {
      this.proposalError = 'Please enter a valid price.';
      return;
    }

    const transporterId = this.authService.getCurrentUserId();
    if (transporterId !== null && this.shipmentToPropose) {
      const request: ShipmentRequest = {
        shipment: { id: this.shipmentToPropose.id },
        transporter: { id: transporterId },
        proposedPrice: this.proposedPrice,
        status: 'PENDING'
      };

      this.shipmentRequestService.sendRequest(request).subscribe(
        () => {
          this.requestedShipmentIds.add(this.shipmentToPropose.id);
          this.proposalSuccess = true;
          this.proposalError = null;
        },
        (err: any) => {
          this.proposalError = 'Failed to send proposal.';
          console.error(err);
        }
      );
    }
  }
}
