import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTransporterComponent } from './login-transporter.component';

describe('LoginTransporterComponent', () => {
  let component: LoginTransporterComponent;
  let fixture: ComponentFixture<LoginTransporterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginTransporterComponent]
    });
    fixture = TestBed.createComponent(LoginTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
