import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAppliesCandidatComponent } from './skeleton-applies-candidat.component';

describe('SkeletonAppliesCandidatComponent', () => {
  let component: SkeletonAppliesCandidatComponent;
  let fixture: ComponentFixture<SkeletonAppliesCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAppliesCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAppliesCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
