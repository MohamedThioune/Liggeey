import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeCandidatComponent } from './resume-candidat.component';

describe('ResumeCandidatComponent', () => {
  let component: ResumeCandidatComponent;
  let fixture: ComponentFixture<ResumeCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
