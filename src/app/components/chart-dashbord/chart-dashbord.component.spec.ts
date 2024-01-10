import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDashbordComponent } from './chart-dashbord.component';

describe('ChartDashbordComponent', () => {
  let component: ChartDashbordComponent;
  let fixture: ComponentFixture<ChartDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDashbordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
