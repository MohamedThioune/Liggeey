import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCandidatComponent } from './course-candidat.component';

describe('CourseCandidatComponent', () => {
  let component: CourseCandidatComponent;
  let fixture: ComponentFixture<CourseCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
