import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSettingsCommonComponent } from './service-settings-common.component';

describe('ServiceSettingsCommonComponent', () => {
  let component: ServiceSettingsCommonComponent;
  let fixture: ComponentFixture<ServiceSettingsCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSettingsCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSettingsCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
