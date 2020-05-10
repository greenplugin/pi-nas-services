import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerContainerConsoleComponent } from './docker-container-console.component';

describe('DockerContainerConsoleComponent', () => {
  let component: DockerContainerConsoleComponent;
  let fixture: ComponentFixture<DockerContainerConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerContainerConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerContainerConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
