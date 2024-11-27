import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonAllCompaniesLoaderComponent } from './skeleton-all-companies-loader.component';

describe('SkeletonAllCompaniesLoaderComponent', () => {
  let component: SkeletonAllCompaniesLoaderComponent;
  let fixture: ComponentFixture<SkeletonAllCompaniesLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonAllCompaniesLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonAllCompaniesLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
