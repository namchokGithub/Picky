import { TestBed } from '@angular/core/testing';

import { ListTransectionService } from './list-transection.service';

describe('ListTransectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListTransectionService = TestBed.get(ListTransectionService);
    expect(service).toBeTruthy();
  });
});
