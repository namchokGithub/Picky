import { TestBed } from '@angular/core/testing';

import { DetailTarnsectionService } from './detail-tarnsection.service';

describe('DetailTarnsectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetailTarnsectionService = TestBed.get(DetailTarnsectionService);
    expect(service).toBeTruthy();
  });
});
