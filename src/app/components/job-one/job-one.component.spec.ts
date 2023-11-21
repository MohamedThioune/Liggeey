import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOneComponent } from './job-one.component';

describe('JobOneComponent', () => {
  let component: JobOneComponent;
  let fixture: ComponentFixture<JobOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
