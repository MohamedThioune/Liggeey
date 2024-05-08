import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHomePageLoaderComponent } from './skeleton-home-page-loader.component';

describe('SkeletonHomePageLoaderComponent', () => {
  let component: SkeletonHomePageLoaderComponent;
  let fixture: ComponentFixture<SkeletonHomePageLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonHomePageLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonHomePageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
