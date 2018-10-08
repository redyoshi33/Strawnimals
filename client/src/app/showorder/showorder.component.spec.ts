import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoworderComponent } from './showorder.component';

describe('ShoworderComponent', () => {
  let component: ShoworderComponent;
  let fixture: ComponentFixture<ShoworderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoworderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoworderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
