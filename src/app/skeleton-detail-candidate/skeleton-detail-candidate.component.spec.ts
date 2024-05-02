import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailCandidateComponent } from './skeleton-detail-candidate.component';

describe('SkeletonDetailCandidateComponent', () => {
  let component: SkeletonDetailCandidateComponent;
  let fixture: ComponentFixture<SkeletonDetailCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDetailCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDetailCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
