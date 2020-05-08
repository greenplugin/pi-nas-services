import { TestBed } from '@angular/core/testing';

import { PptpConfigApiService } from './pptp-config-api.service';

describe('PptpConfigApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PptpConfigApiService = TestBed.get(PptpConfigApiService);
    expect(service).toBeTruthy();
  });
});
