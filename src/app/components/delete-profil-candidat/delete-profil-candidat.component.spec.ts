import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfilCandidatComponent } from './delete-profil-candidat.component';

describe('DeleteProfilCandidatComponent', () => {
  let component: DeleteProfilCandidatComponent;
  let fixture: ComponentFixture<DeleteProfilCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfilCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProfilCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
