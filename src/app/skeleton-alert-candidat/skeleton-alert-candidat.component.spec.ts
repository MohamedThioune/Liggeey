import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAlertCandidatComponent } from './skeleton-alert-candidat.component';

describe('SkeletonAlertCandidatComponent', () => {
  let component: SkeletonAlertCandidatComponent;
  let fixture: ComponentFixture<SkeletonAlertCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAlertCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAlertCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
