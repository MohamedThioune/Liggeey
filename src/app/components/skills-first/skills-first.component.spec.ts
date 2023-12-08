import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsFirstComponent } from './skills-first.component';

describe('SkillsFirstComponent', () => {
  let component: SkillsFirstComponent;
  let fixture: ComponentFixture<SkillsFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
