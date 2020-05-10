import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerContainerSummaryComponent } from './docker-container-summary.component';

describe('DockerContainerSummaryComponent', () => {
  let component: DockerContainerSummaryComponent;
  let fixture: ComponentFixture<DockerContainerSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerContainerSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerContainerSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
