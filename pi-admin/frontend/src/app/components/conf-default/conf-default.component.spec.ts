import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfDefaultComponent } from './conf-default.component';

describe('ConfDefaultComponent', () => {
  let component: ConfDefaultComponent;
  let fixture: ComponentFixture<ConfDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
