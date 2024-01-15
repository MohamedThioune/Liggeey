import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordCompagnyComponent } from './change-password-compagny.component';

describe('ChangePasswordCompagnyComponent', () => {
  let component: ChangePasswordCompagnyComponent;
  let fixture: ComponentFixture<ChangePasswordCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
