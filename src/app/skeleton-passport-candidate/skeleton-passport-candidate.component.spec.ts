import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPassportCandidateComponent } from './skeleton-passport-candidate.component';

describe('SkeletonPassportCandidateComponent', () => {
  let component: SkeletonPassportCandidateComponent;
  let fixture: ComponentFixture<SkeletonPassportCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonPassportCandidateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonPassportCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
