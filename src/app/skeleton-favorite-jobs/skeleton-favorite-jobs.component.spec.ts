import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonFavoriteJobsComponent } from './skeleton-favorite-jobs.component';

describe('SkeletonFavoriteJobsComponent', () => {
  let component: SkeletonFavoriteJobsComponent;
  let fixture: ComponentFixture<SkeletonFavoriteJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonFavoriteJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonFavoriteJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
