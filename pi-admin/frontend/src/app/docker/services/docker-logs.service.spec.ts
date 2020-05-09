import { TestBed } from '@angular/core/testing';

import { DockerLogsService } from './docker-logs.service';

describe('DockerLogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DockerLogsService = TestBed.get(DockerLogsService);
    expect(service).toBeTruthy();
  });
});
