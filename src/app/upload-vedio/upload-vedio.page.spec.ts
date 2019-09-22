import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadVedioPage } from './upload-vedio.page';

describe('UploadVedioPage', () => {
  let component: UploadVedioPage;
  let fixture: ComponentFixture<UploadVedioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadVedioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadVedioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
