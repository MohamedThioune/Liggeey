import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAllApplicantsComponent } from './skeleton-all-applicants.component';

describe('SkeletonAllApplicantsComponent', () => {
  let component: SkeletonAllApplicantsComponent;
  let fixture: ComponentFixture<SkeletonAllApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAllApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAllApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
