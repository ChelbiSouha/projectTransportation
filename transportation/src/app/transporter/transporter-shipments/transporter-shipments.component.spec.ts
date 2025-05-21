import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterShipmentsComponent } from './transporter-shipments.component';

describe('TransporterShipmentsComponent', () => {
  let component: TransporterShipmentsComponent;
  let fixture: ComponentFixture<TransporterShipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporterShipmentsComponent]
    });
    fixture = TestBed.createComponent(TransporterShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
