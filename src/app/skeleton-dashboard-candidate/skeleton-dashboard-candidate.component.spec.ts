import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDashboardCandidateComponent } from './skeleton-dashboard-candidate.component';

describe('SkeletonDashboardCandidateComponent', () => {
  let component: SkeletonDashboardCandidateComponent;
  let fixture: ComponentFixture<SkeletonDashboardCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDashboardCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDashboardCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
