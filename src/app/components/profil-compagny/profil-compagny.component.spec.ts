import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilCompagnyComponent } from './profil-compagny.component';

describe('ProfilCompagnyComponent', () => {
  let component: ProfilCompagnyComponent;
  let fixture: ComponentFixture<ProfilCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
