import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeCandidatComponent } from './badge-candidat.component';

describe('BadgeCandidatComponent', () => {
  let component: BadgeCandidatComponent;
  let fixture: ComponentFixture<BadgeCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
