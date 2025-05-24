import { Component, OnInit } from '@angular/core';
import { ShipmentService } from '../../services/shipment.service';
import { ShipmentRequestService } from '../../services/shipment-request.service';
import { AuthService } from '../../services/auth-service.service';
import { Shipment } from '../../models/shipment.model';
import { ShipmentRequest } from '../../models/shipment-request.model';
import { TransporterService } from '../../services/transporter.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  shipments: Shipment[] = [];
  isLoading = true;
  error: string | null = null;
  transporterId: number | null = null;
  selectedShipment: Shipment | null = null;
  shipmentToPropose: Shipment | null = null;
  proposedPrice: number = 0;
  proposalError: string | null = null;
  proposalSuccess: boolean = false;
  requestedShipmentIds: Set<number> = new Set();

  constructor(
    private shipmentService: ShipmentService,
    private shipmentRequestService: ShipmentRequestService,
    private authService: AuthService,
    private transporterService: TransporterService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      if (user?.id) {
        this.transporterService.getTransporterById(user.id).subscribe({
          next: (transporter) => {
            this.transporterId = transporter.id;
            this.fetchShipments();
            this.fetchSentRequests();
          },
          error: () => {
            console.error("L'utilisateur connecté n'est pas un transporteur.");
          }
        });
      } else {
        console.error("Utilisateur non connecté");
      }
    });
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

  fetchSentRequests() {
    if (this.transporterId !== null) {
      this.shipmentRequestService.getRequestsByTransporter(this.transporterId).subscribe(
        (requests) => {
          requests.forEach((req) => this.requestedShipmentIds.add(req.shipment.id));
        },
        (error) => {
          console.error('Failed to load sent requests.', error);
        }
      );
    }
  }

  openModal(shipment: Shipment) {
    this.selectedShipment = shipment;
  }

  closeModal() {
    this.selectedShipment = null;
  }

  openProposalModal(shipment: Shipment) {
    this.shipmentToPropose = shipment;
    this.proposedPrice = shipment.proposedPrice || 0;
    this.proposalError = null;
    this.proposalSuccess = false;
  }

  closeProposalModal() {
    this.shipmentToPropose = null;
    this.proposalError = null;
    this.proposalSuccess = false;
  }

  sendProposal() {
    const transporterId = this.authService.getCurrentUserId();

    if (!this.shipmentToPropose || !transporterId) {
      this.proposalError = "Missing shipment or transporter ID.";
      return;
    }

    const request: ShipmentRequest = {
      shipment: { id: this.shipmentToPropose.id! },
      transporter: { id: transporterId },
      proposedPrice: this.proposedPrice
    };

    this.shipmentRequestService.sendRequest(request).subscribe(
      () => {
        this.proposalSuccess = true;
        this.proposalError = null;
        this.requestedShipmentIds.add(this.shipmentToPropose!.id!);
        this.closeProposalModal();
      },
      (error) => {
        this.proposalError = 'You have already submitted a proposal or an error occurred.';
        this.proposalSuccess = false;
      }
    );
  }

  acceptShipment(shipment: Shipment) {
    const transporterId = this.authService.getCurrentUserId();

    if (!transporterId) {
      console.error('Transporter ID is required');
      return;
    }

    const request: ShipmentRequest = {
      shipment: { id: shipment.id! },
      transporter: { id: transporterId },
      proposedPrice: shipment.proposedPrice || 0
    };

    this.shipmentRequestService.sendRequest(request).subscribe(
      () => {
        this.requestedShipmentIds.add(shipment.id!);
        alert('You have accepted the shipment at the proposed price.');
      },
      (error) => {
        alert('An error occurred or you have already made a request.');
      }
    );
  }

  hasAlreadyRequested(shipmentId: number): boolean {
    return this.requestedShipmentIds.has(shipmentId);
  }
}
