import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliesJobsComponent } from './applies-jobs.component';

describe('AppliesJobsComponent', () => {
  let component: AppliesJobsComponent;
  let fixture: ComponentFixture<AppliesJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppliesJobsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppliesJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
