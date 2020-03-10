import { TestBed } from '@angular/core/testing';

import { AccountBusinessService } from './account-business.service';

describe('AccountBusinessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountBusinessService = TestBed.get(AccountBusinessService);
    expect(service).toBeTruthy();
  });
});
