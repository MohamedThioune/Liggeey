import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonListChallengesComponent } from './skeleton-list-challenges.component';

describe('SkeletonListChallengesComponent', () => {
  let component: SkeletonListChallengesComponent;
  let fixture: ComponentFixture<SkeletonListChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonListChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonListChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
