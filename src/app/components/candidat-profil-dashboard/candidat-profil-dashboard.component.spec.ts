import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatProfilDashboardComponent } from './candidat-profil-dashboard.component';

describe('CandidatProfilDashboardComponent', () => {
  let component: CandidatProfilDashboardComponent;
  let fixture: ComponentFixture<CandidatProfilDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatProfilDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatProfilDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
