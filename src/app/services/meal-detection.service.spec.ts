import { TestBed } from '@angular/core/testing';

import { MealDetectionService } from './meal-detection.service';

describe('MealDetectionService', () => {
  let service: MealDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
