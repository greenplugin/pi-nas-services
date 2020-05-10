import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerContainerCommonComponent } from './docker-container-common.component';

describe('DockerContainerCommonComponent', () => {
  let component: DockerContainerCommonComponent;
  let fixture: ComponentFixture<DockerContainerCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerContainerCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerContainerCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
