import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailCategoryComponent } from './skeleton-detail-category.component';

describe('SkeletonDetailCategoryComponent', () => {
  let component: SkeletonDetailCategoryComponent;
  let fixture: ComponentFixture<SkeletonDetailCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDetailCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDetailCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
