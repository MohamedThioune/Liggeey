import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonManageCompanyComponent } from './skeleton-manage-company.component';

describe('SkeletonManageCompanyComponent', () => {
  let component: SkeletonManageCompanyComponent;
  let fixture: ComponentFixture<SkeletonManageCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonManageCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonManageCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
