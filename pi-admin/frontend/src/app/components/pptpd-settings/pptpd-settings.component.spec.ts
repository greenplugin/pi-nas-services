import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpdSettingsComponent } from './pptpd-settings.component';

describe('PptpdSettingsComponent', () => {
  let component: PptpdSettingsComponent;
  let fixture: ComponentFixture<PptpdSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpdSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpdSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
