import { TestBed } from '@angular/core/testing';

import { ShipmentRequestService } from './shipment-request.service';

describe('ShipmentRequestService', () => {
  let service: ShipmentRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
