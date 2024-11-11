import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAllCandidatesPageLoaderComponent } from './skeleton-all-candidates-page-loader.component';

describe('SkeletonAllCandidatesPageLoaderComponent', () => {
  let component: SkeletonAllCandidatesPageLoaderComponent;
  let fixture: ComponentFixture<SkeletonAllCandidatesPageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAllCandidatesPageLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAllCandidatesPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
