import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCommonComponent } from './editor-common.component';

describe('EditorCommonComponent', () => {
  let component: EditorCommonComponent;
  let fixture: ComponentFixture<EditorCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
