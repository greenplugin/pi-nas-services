import { TestBed } from '@angular/core/testing';

import { DockerContainersService } from './docker-containers.service';

describe('DockerContainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DockerContainersService = TestBed.get(DockerContainersService);
    expect(service).toBeTruthy();
  });
});
