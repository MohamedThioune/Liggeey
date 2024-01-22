import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatCandidatComponent } from './certificat-candidat.component';

describe('CertificatCandidatComponent', () => {
  let component: CertificatCandidatComponent;
  let fixture: ComponentFixture<CertificatCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificatCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
