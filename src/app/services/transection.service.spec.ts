import { TestBed } from '@angular/core/testing';

import { TransectionService } from './transection.service';

describe('TransectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransectionService = TestBed.get(TransectionService);
    expect(service).toBeTruthy();
  });
});
