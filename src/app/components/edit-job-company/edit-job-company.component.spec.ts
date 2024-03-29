import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobCompanyComponent } from './edit-job-company.component';

describe('EditJobCompanyComponent', () => {
  let component: EditJobCompanyComponent;
  let fixture: ComponentFixture<EditJobCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditJobCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditJobCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
