import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfilCompagnyComponent } from './delete-profil-compagny.component';

describe('DeleteProfilCompagnyComponent', () => {
  let component: DeleteProfilCompagnyComponent;
  let fixture: ComponentFixture<DeleteProfilCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfilCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProfilCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
