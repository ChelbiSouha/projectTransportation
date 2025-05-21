import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporterReviewsComponent } from './transporter-reviews.component';

describe('TransporterReviewsComponent', () => {
  let component: TransporterReviewsComponent;
  let fixture: ComponentFixture<TransporterReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransporterReviewsComponent]
    });
    fixture = TestBed.createComponent(TransporterReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
