import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailBlogComponent } from './skeleton-detail-blog.component';

describe('SkeletonDetailBlogComponent', () => {
  let component: SkeletonDetailBlogComponent;
  let fixture: ComponentFixture<SkeletonDetailBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDetailBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDetailBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
