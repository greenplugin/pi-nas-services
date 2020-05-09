import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerLogComponent } from './docker-log.component';

describe('DockerLogComponent', () => {
  let component: DockerLogComponent;
  let fixture: ComponentFixture<DockerLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
