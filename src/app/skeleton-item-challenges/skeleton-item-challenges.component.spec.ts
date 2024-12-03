import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonItemChallengesComponent } from './skeleton-item-challenges.component';

describe('SkeletonItemChallengesComponent', () => {
  let component: SkeletonItemChallengesComponent;
  let fixture: ComponentFixture<SkeletonItemChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonItemChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonItemChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
