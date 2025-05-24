import { Component, OnInit } from '@angular/core';
import { TransporterService } from '../../services/transporter.service';
import { AdmindashboardService } from '../../services/admindashboard.service';
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.css']
})
export class TransportersComponent implements OnInit {
  transporterRequests: Transporter[] = [];
  selectedTransporter: Transporter | null = null;

  constructor(
    private transporterService: TransporterService,
    private adminService: AdmindashboardService // <- ajout
  ) {}

  ngOnInit(): void {
    this.loadTransporters();
  }

  loadTransporters() {
    this.transporterService.getPendingTransporters().subscribe(data => {
      this.transporterRequests = data;
    });
  }

  viewDetails(request: Transporter) {
    this.selectedTransporter = request;
  }

  closeModal() {
    this.selectedTransporter = null;
  }

  approveRequest(userId: number) {
    this.adminService.approveTransporter(userId).subscribe({
      next: () => {
        this.transporterRequests = this.transporterRequests.filter(r => r.user.id !== userId);
        alert('Transporter approved successfully.');
      },
      error: () => {
        alert('Error approving transporter.');
      }
    });
  }

  rejectRequest(userId: number) {
    this.adminService.rejectTransporter(userId).subscribe({
      next: () => {
        this.transporterRequests = this.transporterRequests.filter(t => t.user.id !== userId);
        alert('Transporter rejected and deleted.');
      },
      error: () => {
        alert('Error rejecting transporter.');
      }
    });
  }

}
