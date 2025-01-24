import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorLandingPageComponent } from './investor-landing-page.component';

describe('InvestorLandingPageComponent', () => {
  let component: InvestorLandingPageComponent;
  let fixture: ComponentFixture<InvestorLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestorLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
