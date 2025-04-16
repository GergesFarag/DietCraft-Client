import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealDetectionComponent } from './meal-detection.component';

describe('MealDetectionComponent', () => {
  let component: MealDetectionComponent;
  let fixture: ComponentFixture<MealDetectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealDetectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
