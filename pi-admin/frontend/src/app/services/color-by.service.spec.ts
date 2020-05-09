import { TestBed } from '@angular/core/testing';

import { ColorByService } from './color-by.service';

describe('ColorByService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorByService = TestBed.get(ColorByService);
    expect(service).toBeTruthy();
  });
});
