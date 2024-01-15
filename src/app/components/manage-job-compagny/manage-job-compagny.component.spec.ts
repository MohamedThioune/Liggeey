import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobCompagnyComponent } from './manage-job-compagny.component';

describe('ManageJobCompagnyComponent', () => {
  let component: ManageJobCompagnyComponent;
  let fixture: ComponentFixture<ManageJobCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJobCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageJobCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
