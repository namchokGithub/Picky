import { TestBed } from '@angular/core/testing';

import { AccountPersonService } from './account-person.service';

describe('AccountPersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountPersonService = TestBed.get(AccountPersonService);
    expect(service).toBeTruthy();
  });
});
