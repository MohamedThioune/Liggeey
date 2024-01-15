import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCandidatComponent } from './change-password-candidat.component';

describe('ChangePasswordCandidatComponent', () => {
  let component: ChangePasswordCandidatComponent;
  let fixture: ComponentFixture<ChangePasswordCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
