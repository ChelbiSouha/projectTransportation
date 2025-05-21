import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentListComponent } from './shipment-list.component';

describe('ShipmentListComponent', () => {
  let component: ShipmentListComponent;
  let fixture: ComponentFixture<ShipmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipmentListComponent]
    });
    fixture = TestBed.createComponent(ShipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
