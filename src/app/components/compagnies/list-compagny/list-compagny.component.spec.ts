import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompagnyComponent } from './list-compagny.component';

describe('ListCompagnyComponent', () => {
  let component: ListCompagnyComponent;
  let fixture: ComponentFixture<ListCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
