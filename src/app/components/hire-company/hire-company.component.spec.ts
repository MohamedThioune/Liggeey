import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireCompanyComponent } from './hire-company.component';

describe('HireCompanyComponent', () => {
  let component: HireCompanyComponent;
  let fixture: ComponentFixture<HireCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
