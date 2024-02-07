import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeAlertCompagnyComponent } from './resume-alert-compagny.component';

describe('ResumeAlertCompagnyComponent', () => {
  let component: ResumeAlertCompagnyComponent;
  let fixture: ComponentFixture<ResumeAlertCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeAlertCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeAlertCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
