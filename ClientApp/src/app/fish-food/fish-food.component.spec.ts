import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishFoodComponent } from './fish-food.component';

describe('FishFoodComponent', () => {
  let component: FishFoodComponent;
  let fixture: ComponentFixture<FishFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
