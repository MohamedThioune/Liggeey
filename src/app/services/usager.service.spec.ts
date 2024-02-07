import { TestBed } from '@angular/core/testing';

import { UsagerService } from './usager.service';

describe('UsagerService', () => {
  let service: UsagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
