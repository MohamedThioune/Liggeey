import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonDashbordEmployerComponent } from './skeleton-dashbord-employer.component';

describe('SkeletonDashbordEmployerComponent', () => {
  let component: SkeletonDashbordEmployerComponent;
  let fixture: ComponentFixture<SkeletonDashbordEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonDashbordEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonDashbordEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
