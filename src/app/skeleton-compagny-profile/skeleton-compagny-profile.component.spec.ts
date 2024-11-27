import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonCompagnyProfileComponent } from './skeleton-compagny-profile.component';

describe('SkeletonCompagnyProfileComponent', () => {
  let component: SkeletonCompagnyProfileComponent;
  let fixture: ComponentFixture<SkeletonCompagnyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonCompagnyProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonCompagnyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
