import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerTerminalComponent } from './docker-terminal.component';

describe('DockerTerminalComponent', () => {
  let component: DockerTerminalComponent;
  let fixture: ComponentFixture<DockerTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
