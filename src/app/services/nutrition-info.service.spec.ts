import { TestBed } from '@angular/core/testing';

import { NutritionInfoService } from './nutrition-info.service';

describe('NutritionInfoService', () => {
  let service: NutritionInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
