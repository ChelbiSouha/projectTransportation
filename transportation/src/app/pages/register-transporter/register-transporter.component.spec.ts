import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTransporterComponent } from './register-transporter.component';

describe('RegisterTransporterComponent', () => {
  let component: RegisterTransporterComponent;
  let fixture: ComponentFixture<RegisterTransporterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTransporterComponent]
    });
    fixture = TestBed.createComponent(RegisterTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
