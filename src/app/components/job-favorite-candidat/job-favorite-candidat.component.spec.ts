import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFavoriteCandidatComponent } from './job-favorite-candidat.component';

describe('JobFavoriteCandidatComponent', () => {
  let component: JobFavoriteCandidatComponent;
  let fixture: ComponentFixture<JobFavoriteCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFavoriteCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFavoriteCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
