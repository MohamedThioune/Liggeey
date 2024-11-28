import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonResumeCandidateComponent } from './skeleton-resume-candidate.component';

describe('SkeletonResumeCandidateComponent', () => {
  let component: SkeletonResumeCandidateComponent;
  let fixture: ComponentFixture<SkeletonResumeCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonResumeCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonResumeCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
