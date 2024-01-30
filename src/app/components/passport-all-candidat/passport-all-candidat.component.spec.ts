import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportAllCandidatComponent } from './passport-all-candidat.component';

describe('PassportAllCandidatComponent', () => {
  let component: PassportAllCandidatComponent;
  let fixture: ComponentFixture<PassportAllCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportAllCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportAllCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
