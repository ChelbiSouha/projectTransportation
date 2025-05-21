import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentStep1Component } from './shipment-step1.component';

describe('ShipmentStep1Component', () => {
  let component: ShipmentStep1Component;
  let fixture: ComponentFixture<ShipmentStep1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentStep1Component]
    });
    fixture = TestBed.createComponent(ShipmentStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
