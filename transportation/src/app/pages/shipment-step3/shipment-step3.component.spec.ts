import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStep3Component } from './shipment-step3.component';

describe('ShipmentStep3Component', () => {
  let component: ShipmentStep3Component;
  let fixture: ComponentFixture<ShipmentStep3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentStep3Component]
    });
    fixture = TestBed.createComponent(ShipmentStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
