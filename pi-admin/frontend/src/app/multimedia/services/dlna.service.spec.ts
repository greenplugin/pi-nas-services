import { TestBed } from '@angular/core/testing';

import { DlnaService } from './dlna.service';

describe('DlnaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DlnaService = TestBed.get(DlnaService);
    expect(service).toBeTruthy();
  });
});
