import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnyFavoriteCandidatComponent } from './compagny-favorite-candidat.component';

describe('CompagnyFavoriteCandidatComponent', () => {
  let component: CompagnyFavoriteCandidatComponent;
  let fixture: ComponentFixture<CompagnyFavoriteCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompagnyFavoriteCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompagnyFavoriteCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
