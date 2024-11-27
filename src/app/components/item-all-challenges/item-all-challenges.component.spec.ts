import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAllChallengesComponent } from './item-all-challenges.component';

describe('ItemAllChallengesComponent', () => {
  let component: ItemAllChallengesComponent;
  let fixture: ComponentFixture<ItemAllChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAllChallengesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAllChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
