import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAlertCandidatComponent } from './job-alert-candidat.component';

describe('JobAlertCandidatComponent', () => {
  let component: JobAlertCandidatComponent;
  let fixture: ComponentFixture<JobAlertCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobAlertCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobAlertCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
