import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCandidatComponent } from './assessment-candidat.component';

describe('AssessmentCandidatComponent', () => {
  let component: AssessmentCandidatComponent;
  let fixture: ComponentFixture<AssessmentCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
