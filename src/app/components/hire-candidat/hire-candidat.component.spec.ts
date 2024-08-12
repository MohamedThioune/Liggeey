import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireCandidatComponent } from './hire-candidat.component';

describe('HireCandidatComponent', () => {
  let component: HireCandidatComponent;
  let fixture: ComponentFixture<HireCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HireCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
