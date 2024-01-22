import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppicantsAllCompagnyComponent } from './appicants-all-compagny.component';

describe('AppicantsAllCompagnyComponent', () => {
  let component: AppicantsAllCompagnyComponent;
  let fixture: ComponentFixture<AppicantsAllCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppicantsAllCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppicantsAllCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
