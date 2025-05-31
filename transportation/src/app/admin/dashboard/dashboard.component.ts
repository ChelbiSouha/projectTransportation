import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { AdmindashboardService } from 'src/app/services/admindashboard.service';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    users: 0,
    shipments: 0,
    pendingTransporters: 0,
    reviews: 0
  };
  user: any;
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Shipments'
      }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = { responsive: true };

  constructor(private admindashboardService: AdmindashboardService,private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.admindashboardService.getStats().subscribe((data) => {
      this.stats = {
        users: data['users'],
        shipments: data['shipments'],
        pendingTransporters: data['pendingTransporters'],
        reviews: data['reviews']
      };
    });

    this.admindashboardService.getShipmentsPerWeek().subscribe((data) => {
      this.barChartData.labels = Object.keys(data);
      this.barChartData.datasets[0].data = Object.values(data);
    });
  }
}
