import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Importer le module de routage
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderfooterComponent } from './headerfooter/headerfooter.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { TransportersComponent } from './admin/transporters/transporters.component';
import { AdminUsersComponent } from './admin/users/users.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { FooterComponent as AdminFooterComponent } from './admin/footer/footer.component';
import { SettingsPanelComponent } from './admin/settings-panel/settings-panel.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { RegisterTransporterComponent } from './pages/register-transporter/register-transporter.component';
import { LoginTransporterComponent } from './pages/login-transporter/login-transporter.component';
import { AdminShipmentsComponent } from './admin/admin-shipments/admin-shipments.component';
import { AdminReviewsComponent } from './admin/admin-reviews/admin-reviews.component';
import { AdminQuotesComponent } from './admin/admin-quotes/admin-quotes.component';
import { TransporterDashboardComponent } from './transporter/transporter-dashboard/transporter-dashboard.component';
import { TransporterShipmentsComponent } from './transporter/transporter-shipments/transporter-shipments.component';
import { TransporterProfileComponent } from './transporter/transporter-profile/transporter-profile.component';
import { TransporterReviewsComponent } from './transporter/transporter-reviews/transporter-reviews.component';
import { AvailableTransportersComponent } from './pages/available-transporters/available-transporters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserReviewsComponent } from './pages/user-reviews/user-reviews.component';
import { ShipmentStep1Component } from './pages/shipment-step1/shipment-step1.component';
import { ShipmentStep2Component } from './pages/shipment-step2/shipment-step2.component';
import { ShipmentStep3Component } from './pages/shipment-step3/shipment-step3.component';
import { ShipmentListComponent } from './pages/shipment-list/shipment-list.component';
import { RegisterAdminComponent } from './admin/register-admin/register-admin.component';
import { ShipmentTrackingComponent } from './pages/shipment-tracking/shipment-tracking.component';
import { ChatbotComponent } from './chatbot/chatbot.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderfooterComponent,
    LoginComponent,
    UsersComponent,
    SignupComponent,
    HomeComponent,
    DashboardComponent,
    TransportersComponent,
    LayoutComponent,
    SidebarComponent,
    NavbarComponent,
    AdminFooterComponent,
    SettingsPanelComponent,
    RegisterTransporterComponent,
    LoginTransporterComponent,
    AdminUsersComponent,
    AdminShipmentsComponent,
    AdminReviewsComponent,
    AdminQuotesComponent,
    TransporterDashboardComponent,
    TransporterShipmentsComponent,
    TransporterProfileComponent,
    TransporterReviewsComponent,
    AvailableTransportersComponent,
    UserReviewsComponent,
    ShipmentStep1Component,
    ShipmentStep2Component,
    ShipmentStep3Component,
    ShipmentListComponent,
    RegisterAdminComponent,
    ShipmentTrackingComponent,
    ChatbotComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NgbModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    LeafletModule
  ],
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
