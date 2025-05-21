import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderfooterComponent } from './headerfooter/headerfooter.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { LayoutComponent } from './admin/layout/layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { TransportersComponent } from './admin/transporters/transporters.component';
import { RegisterTransporterComponent } from './pages/register-transporter/register-transporter.component';
import { LoginTransporterComponent } from './pages/login-transporter/login-transporter.component'
import { AdminShipmentsComponent } from './admin/admin-shipments/admin-shipments.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';
import { AdminQuotesComponent } from './admin/admin-quotes/admin-quotes.component';
import { TransporterDashboardComponent } from './transporter/transporter-dashboard/transporter-dashboard.component';
import { TransporterShipmentsComponent } from './transporter/transporter-shipments/transporter-shipments.component';
import { TransporterProfileComponent } from './transporter/transporter-profile/transporter-profile.component';
import { TransporterReviewsComponent } from './transporter/transporter-reviews/transporter-reviews.component';
import { AvailableTransportersComponent } from './pages/available-transporters/available-transporters.component';
import { ShipmentStep1Component } from './pages/shipment-step1/shipment-step1.component';
import { ShipmentStep2Component } from './pages/shipment-step2/shipment-step2.component';
import { ShipmentStep3Component } from './pages/shipment-step3/shipment-step3.component';
import { ShipmentListComponent } from './pages/shipment-list/shipment-list.component';
import { UserReviewsComponent } from './pages/user-reviews/user-reviews.component';



const routes: Routes = [
  {
    path: 'home',
    component: HeaderfooterComponent,
    children: [
      { path: 'acceuil', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: '/home/acceuil', pathMatch: 'full' },
      { path: 'available-transporters', component: AvailableTransportersComponent },
      { path: 'step1',component: ShipmentStep1Component},
      { path: 'step2',component: ShipmentStep2Component},
      { path: 'step3',component: ShipmentStep3Component},
      { path: 'list',component: ShipmentListComponent},
      { path: 'review',component: UserReviewsComponent },



    ]
  },
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'transporters', component: TransportersComponent },
      { path: 'reviews', component: AdminReviewsComponent },
      { path: 'shipments', component: AdminShipmentsComponent },
      { path: 'quotes', component: AdminQuotesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ]
  },
  { path: 'register-transporter', component: RegisterTransporterComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-transporter', component: LoginTransporterComponent },
  { path: 'dashboard-transporter', component: TransporterDashboardComponent },
  { path: 'transporter-shipments', component: TransporterShipmentsComponent },
  { path: 'transporter-profile', component: TransporterProfileComponent },
  { path: 'transporter-reviews', component: TransporterReviewsComponent },



  { path: '**', redirectTo: '/home' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
