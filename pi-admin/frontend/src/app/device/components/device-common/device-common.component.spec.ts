import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCommonComponent } from './device-common.component';

describe('DeviceCommonComponent', () => {
  let component: DeviceCommonComponent;
  let fixture: ComponentFixture<DeviceCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
