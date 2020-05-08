import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpOptionsComponent } from './pptp-options.component';

describe('PptpOptionsComponent', () => {
  let component: PptpOptionsComponent;
  let fixture: ComponentFixture<PptpOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
