import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonHeaderLoaderComponent } from './skeleton-header-loader.component';

describe('SkeletonHeaderLoaderComponent', () => {
  let component: SkeletonHeaderLoaderComponent;
  let fixture: ComponentFixture<SkeletonHeaderLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonHeaderLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonHeaderLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
