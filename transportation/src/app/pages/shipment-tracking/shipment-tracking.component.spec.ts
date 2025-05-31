import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentTrackingComponent } from './shipment-tracking.component';

describe('ShipmentTrackingComponent', () => {
  let component: ShipmentTrackingComponent;
  let fixture: ComponentFixture<ShipmentTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentTrackingComponent]
    });
    fixture = TestBed.createComponent(ShipmentTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
