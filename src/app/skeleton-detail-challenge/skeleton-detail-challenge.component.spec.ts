import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailChallengeComponent } from './skeleton-detail-challenge.component';

describe('SkeletonDetailChallengeComponent', () => {
  let component: SkeletonDetailChallengeComponent;
  let fixture: ComponentFixture<SkeletonDetailChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDetailChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDetailChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
