import { TestBed } from '@angular/core/testing';

import { AccountFamilyService } from './account-family.service';

describe('AccountFamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountFamilyService = TestBed.get(AccountFamilyService);
    expect(service).toBeTruthy();
  });
});
