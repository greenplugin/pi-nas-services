import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpChapSecretsComponent } from './pptp-chap-secrets.component';

describe('PptpChapSecretsComponent', () => {
  let component: PptpChapSecretsComponent;
  let fixture: ComponentFixture<PptpChapSecretsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpChapSecretsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpChapSecretsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
