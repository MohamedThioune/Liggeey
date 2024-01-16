import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCandidatComponent } from './topic-candidat.component';

describe('TopicCandidatComponent', () => {
  let component: TopicCandidatComponent;
  let fixture: ComponentFixture<TopicCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
