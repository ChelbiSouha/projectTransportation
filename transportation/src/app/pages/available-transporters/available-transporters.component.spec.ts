import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableTransportersComponent } from './available-transporters.component';

describe('AvailableTransportersComponent', () => {
  let component: AvailableTransportersComponent;
  let fixture: ComponentFixture<AvailableTransportersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AvailableTransportersComponent]
    });
    fixture = TestBed.createComponent(AvailableTransportersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
