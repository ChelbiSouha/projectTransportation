import { Component, OnInit } from '@angular/core';
import { TransporterService } from 'src/app/services/transporter.service';
import { Transporter } from 'src/app/models/transporter.model';

@Component({
  selector: 'app-transporters',
  templateUrl: './transporters.component.html',
  styleUrls: ['./transporters.component.css']
})
export class TransportersComponent implements OnInit {
  transporterRequests: Transporter[] = [];
  selectedTransporter: Transporter | null = null;

  constructor(private transporterService: TransporterService) {}

  ngOnInit(): void {
    this.loadTransporters();
  }

  loadTransporters() {
    this.transporterService.getAllTransporters().subscribe(data => {
      this.transporterRequests = data;
    });
  }

  viewDetails(request: Transporter) {
    this.selectedTransporter = request;
  }

  closeModal() {
    this.selectedTransporter = null;
  }

  approveRequest(id: number) {
    const transporter = this.transporterRequests.find(r => r.id === id);
    if (transporter) {
      transporter.available = true;
      this.transporterService.updateTransporter(id, transporter).subscribe(() => {
        transporter.available = true;
      });
    }
  }

  rejectRequest(id: number) {
    const transporter = this.transporterRequests.find(r => r.id === id);
    if (transporter) {
      transporter.available = false;
      this.transporterService.updateTransporter(id, transporter).subscribe(() => {
        transporter.available = false;
      });
    }
  }
}
