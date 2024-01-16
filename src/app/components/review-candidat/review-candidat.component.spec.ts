import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewCandidatComponent } from './review-candidat.component';

describe('ReviewCandidatComponent', () => {
  let component: ReviewCandidatComponent;
  let fixture: ComponentFixture<ReviewCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
