import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDetailCompanyComponent } from './skeleton-detail-company.component';

describe('SkeletonDetailCompanyComponent', () => {
  let component: SkeletonDetailCompanyComponent;
  let fixture: ComponentFixture<SkeletonDetailCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDetailCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDetailCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
