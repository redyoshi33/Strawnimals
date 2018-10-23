import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturemodalComponent } from './picturemodal.component';

describe('PicturemodalComponent', () => {
  let component: PicturemodalComponent;
  let fixture: ComponentFixture<PicturemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
