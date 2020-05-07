import { TestBed } from '@angular/core/testing';

import { MainIconsService } from './main-icons.service';

describe('MainIconsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainIconsService = TestBed.get(MainIconsService);
    expect(service).toBeTruthy();
  });
});
