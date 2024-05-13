import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAllJobsLoaderComponent } from './skeleton-all-jobs-loader.component';

describe('SkeletonAllJobsLoaderComponent', () => {
  let component: SkeletonAllJobsLoaderComponent;
  let fixture: ComponentFixture<SkeletonAllJobsLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAllJobsLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAllJobsLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
