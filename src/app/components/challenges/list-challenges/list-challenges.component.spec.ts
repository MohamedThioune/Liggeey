import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChallengesComponent } from './list-challenges.component';

describe('ListChallengesComponent', () => {
  let component: ListChallengesComponent;
  let fixture: ComponentFixture<ListChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
