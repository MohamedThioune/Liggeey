import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCandidatComponent } from './cv-candidat.component';

describe('CvCandidatComponent', () => {
  let component: CvCandidatComponent;
  let fixture: ComponentFixture<CvCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
