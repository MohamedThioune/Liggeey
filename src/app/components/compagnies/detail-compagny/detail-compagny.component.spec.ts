import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCompagnyComponent } from './detail-compagny.component';

describe('DetailCompagnyComponent', () => {
  let component: DetailCompagnyComponent;
  let fixture: ComponentFixture<DetailCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
