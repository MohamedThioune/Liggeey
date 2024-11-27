import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChallengeComponent } from './detail-challenge.component';

describe('DetailChallengeComponent', () => {
  let component: DetailChallengeComponent;
  let fixture: ComponentFixture<DetailChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
