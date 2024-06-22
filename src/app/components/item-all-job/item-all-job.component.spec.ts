import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemAllJobComponent } from './item-all-job.component';

describe('ItemAllJobComponent', () => {
  let component: ItemAllJobComponent;
  let fixture: ComponentFixture<ItemAllJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemAllJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemAllJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
