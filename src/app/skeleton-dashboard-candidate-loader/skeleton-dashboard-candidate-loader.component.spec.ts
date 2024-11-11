import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDashboardCandidateLoaderComponent } from './skeleton-dashboard-candidate-loader.component';

describe('SkeletonDashboardCandidateLoaderComponent', () => {
  let component: SkeletonDashboardCandidateLoaderComponent;
  let fixture: ComponentFixture<SkeletonDashboardCandidateLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDashboardCandidateLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDashboardCandidateLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
