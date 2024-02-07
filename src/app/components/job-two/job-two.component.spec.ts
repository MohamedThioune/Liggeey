import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTwoComponent } from './job-two.component';

describe('JobTwoComponent', () => {
  let component: JobTwoComponent;
  let fixture: ComponentFixture<JobTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
