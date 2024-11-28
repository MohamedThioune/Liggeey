import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCompagnyCandidatComponent } from './skeleton-compagny-candidat.component';

describe('SkeletonCompagnyCandidatComponent', () => {
  let component: SkeletonCompagnyCandidatComponent;
  let fixture: ComponentFixture<SkeletonCompagnyCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonCompagnyCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCompagnyCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
