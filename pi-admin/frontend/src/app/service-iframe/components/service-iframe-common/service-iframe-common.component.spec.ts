import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceIframeCommonComponent } from './service-iframe-common.component';

describe('ServiceIframeCommonComponent', () => {
  let component: ServiceIframeCommonComponent;
  let fixture: ComponentFixture<ServiceIframeCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceIframeCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceIframeCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
