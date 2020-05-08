import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PptpStatisticsComponent } from './pptp-statistics.component';

describe('PptpStatisticsComponent', () => {
  let component: PptpStatisticsComponent;
  let fixture: ComponentFixture<PptpStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PptpStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PptpStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
