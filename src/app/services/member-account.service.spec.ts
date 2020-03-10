import { TestBed } from '@angular/core/testing';

import { MemberAccountService } from './member-account.service';

describe('MemberAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberAccountService = TestBed.get(MemberAccountService);
    expect(service).toBeTruthy();
  });
});
