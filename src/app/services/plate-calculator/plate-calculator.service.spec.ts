import { TestBed } from '@angular/core/testing';

import { PlateCalculatorService } from './plate-calculator.service';

describe('PlateCalculatorService', () => {
  let service: PlateCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlateCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
