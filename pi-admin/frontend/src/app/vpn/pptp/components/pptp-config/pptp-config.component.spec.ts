import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpConfigComponent } from './pptp-config.component';

describe('PptpConfigComponent', () => {
  let component: PptpConfigComponent;
  let fixture: ComponentFixture<PptpConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
