import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNewJobCompagnyComponent } from './post-new-job-compagny.component';

describe('PostNewJobCompagnyComponent', () => {
  let component: PostNewJobCompagnyComponent;
  let fixture: ComponentFixture<PostNewJobCompagnyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostNewJobCompagnyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostNewJobCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
