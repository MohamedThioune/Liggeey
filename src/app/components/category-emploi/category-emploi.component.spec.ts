import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEmploiComponent } from './category-emploi.component';

describe('CategoryEmploiComponent', () => {
  let component: CategoryEmploiComponent;
  let fixture: ComponentFixture<CategoryEmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEmploiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
