import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerContainerLogComponent } from './docker-container-log.component';

describe('DockerContainerLogComponent', () => {
  let component: DockerContainerLogComponent;
  let fixture: ComponentFixture<DockerContainerLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerContainerLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerContainerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
