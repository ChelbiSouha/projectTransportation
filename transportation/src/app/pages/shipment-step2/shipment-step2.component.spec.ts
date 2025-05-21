import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStep2Component } from './shipment-step2.component';

describe('ShipmentStep2Component', () => {
  let component: ShipmentStep2Component;
  let fixture: ComponentFixture<ShipmentStep2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentStep2Component]
    });
    fixture = TestBed.createComponent(ShipmentStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
