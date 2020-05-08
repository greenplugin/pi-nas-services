import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpCommonComponent } from './pptp-common.component';

describe('PptpCommonComponent', () => {
  let component: PptpCommonComponent;
  let fixture: ComponentFixture<PptpCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
