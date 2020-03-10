import { TestBed } from '@angular/core/testing';

import { TypeAccountService } from './type-account.service';

describe('TypeAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeAccountService = TestBed.get(TypeAccountService);
    expect(service).toBeTruthy();
  });
});
