import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlnaCommonComponent } from './dlna-common.component';

describe('DlnaCommonComponent', () => {
  let component: DlnaCommonComponent;
  let fixture: ComponentFixture<DlnaCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlnaCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlnaCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
