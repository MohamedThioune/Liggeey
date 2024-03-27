import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsCandidatComponent } from './skills-candidat.component';

describe('SkillsCandidatComponent', () => {
  let component: SkillsCandidatComponent;
  let fixture: ComponentFixture<SkillsCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
