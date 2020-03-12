import { TestBed } from '@angular/core/testing';

import { ListRecordService } from './list-record.service';

describe('ListRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListRecordService = TestBed.get(ListRecordService);
    expect(service).toBeTruthy();
  });
});
