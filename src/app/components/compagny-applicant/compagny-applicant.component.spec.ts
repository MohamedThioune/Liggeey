import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnyApplicantComponent } from './compagny-applicant.component';

describe('CompagnyApplicantComponent', () => {
  let component: CompagnyApplicantComponent;
  let fixture: ComponentFixture<CompagnyApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagnyApplicantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompagnyApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
